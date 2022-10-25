import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import fs from "fs";
import { parse } from "csv-parse";
import path from "path";

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req);
  const sites: Site[] = [];
  const cases: Case[] = [];

  const customers = await prisma.customer.findMany();

  // customers = [
  //   { customer: "Advantage Metals Recycling", id: 1 },
  //   { customer: "David J Joseph Co", id: 2 },
  //   { customer: "Ferrous Charleston", id: 3 },
  //   { customer: "River Metals Recycling", id: 4 },
  //   { customer: "Texas Port Recycling", id: 5 },
  //   { customer: "Trademark Metals Recycling", id: 6 },
  //   { customer: "U-Pull and Pay", id: 7 },
  //   { customer: "U-Pull-&-Pay", id: 8 },
  //   { customer: "Western Metals Recycling", id: 9 },
  // ];

  interface Site {
    name: string;
    customerId: string;
  }

  interface Case {
    id: string;
    date: string;
    status: string;
    queue: string;
    site?: string;
    siteId: string;
    subject: string;
    stealthNotes: string;
    notes: string;
    atention: boolean;
  }

  fs.writeFile("./public/cases.csv", req.body, (err) => {
    res.send(err);
  });

  fs.createReadStream("./public/cases.csv")
    .pipe(parse({ delimiter: ",", columns: true }))
    .on("data", (row: any) => {
      if (!sites.some((site) => site.name === row.Site)) {
        sites.push({
          name: row.Site,
          customerId: "",
        });
      }

      cases.push({
        id: row["Case Number"],
        date: row["Case Date"],
        status: row["Case Status"],
        queue: row["Queue"],
        site: row.Site,
        siteId: "",
        subject: row["Case Subject"],
        stealthNotes: "",
        notes: "",
        atention: true,
      });
    })
    .on("end", async () => {
      sites.sort((a, b) => (a.name > b.name ? 1 : -1));

      for (let site of sites) {
        for (let customer of customers) {
          if (site.name.includes(customer.name)) {
            if (customer.name === "David J Joseph Co") {
              site.customerId = customer.id;
            } else {
              site.name = (site.name.split(customer.name)[1] || "").substring(
                1
              );
              site.customerId = customer.id;
            }
          }
        }
      }

      try {
        const sitesWhithCustomer = await prisma.site.createMany({
          data: sites,
          skipDuplicates: true,
        });
      } catch (error) {
        console.log(error);
      }

      const dbSites = await prisma.site.findMany();

      for (let siteCase of cases) {
        for (let site of dbSites) {
          if (siteCase.site?.includes(`${site.name}`)) {
            siteCase.siteId = site.id;
            delete siteCase.site;
          }
        }
      }

      try {
        const casesWithSite = await prisma.cases.createMany({
          data: cases,
          skipDuplicates: true,
        });
      } catch (error) {
        console.log(error);
      }
    });

  res.send("Imported");
};

export default upload;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // Set desired value here
    },
  },
};
