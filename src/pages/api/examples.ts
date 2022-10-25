// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const kk = await prisma.customer.createMany(
    {
      data: [
        { name: "Advantage Metals Recycling", alt: "AMR" },
        { name: "David J Joseph Co", alt: "DJJ" },
        { name: "Ferrous Charleston", alt: "Fe" },
        { name: "River Metals Recycling", alt: "RMR" },
        { name: "Texas Port Recycling", alt: "TPR" },
        { name: "Trademark Metals Recycling", alt: "TMR" },
        { name: "U-Pull and Pay", alt: "UPAP" },
        { name: "U-Pull-&-Pay", alt: "UPAP" },
        { name: "Western Metals Recycling", alt: "WMR" },
      ]
    }
  )
  
  res.send(kk) 
  
};

export default examples;
