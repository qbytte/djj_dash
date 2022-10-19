import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import fs from "fs";
import { parse } from "csv-parse";

const customers: Customer[] = [];
const sites: Site[] = [];
const cases: Case[] = [];

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

interface Customer {
    id: string;
    name: string;
    alt: string;
}

interface Site {
    name: string;
    customer_id?: string;
}

interface Case {
    id: string;
    date: string;
    status: string;
    queue: string;
    alt: string;
    site: string;
    subject: string;
    stealthNotes: string;
    notes: string;
    atention: boolean;
}



fs.createReadStream("Cases_DJJ 09-28-2022.csv")
  .pipe(parse({ delimiter: ",", columns: true }))
  .on("data", (row) => {
    if (!sites.some((site) => site.name === row.Site)) {
      sites.push({ name: row.Site });
    }

    cases.push({
      id: row["Case Number"],
      date: row["Case Date"],
      status: row["Case Status"],
      queue: row["Queue"],
      alt: "",
      site: row.Site,
      subject: row["Case Subject"],
      stealthNotes: "",
      notes: "",
      atention: true,
    });
  })
  .on("end", () => {
    sites.sort((a, b) => (a.name > b.name ? 1 : -1));

    for (let site of sites) {
      for (let customer of customers) {
        if (site.name.includes(customer.name)) {
          if (customer.name === "David J Joseph Co") {
            site.customer_id = customer.id;
          } else {
            site.name = (site.name.split(customer.name)[1] || "").substring(1);
            site.customer_id = customer.id;
          }
        }
      }
    }

    for (let siteCase of cases) {
      for (let site of sites) {
        if (siteCase.site.includes(`${site.name}`)) {
          siteCase.site = site.name;
          // siteCase.customer_id = customers.find(customer => customer.id === site.customer_id).customer;
        }
      }
    }
  });