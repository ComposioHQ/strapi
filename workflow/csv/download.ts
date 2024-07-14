import { createOrUpdateTagForCSV, getAllPlaygroundExamples, getAllTags, getAllTools } from "./strapi";
const csv = require('csv-parser')
import fs from "fs";

function writeToCSV(data: any[], outputPath: string) {
    const headers = Object.keys(data[0]).join(",");
    const csv = data.map(item =>
        Object.values(item).map(value => {
            if (typeof value === 'string') {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return `${value}`;
        }).join(",")
    ).join("\n");
    fs.writeFileSync(outputPath, `${headers}\n${csv}`);
    console.log(`CSV file written to ${outputPath}`);
}

async function downloadTags(outputPath: string) {
    const tags = await getAllTags();
    const items = tags.data;
    // @ts-expect-error
    const flattenedItems = items.map(item => ({
        id: item.id,
        ...item.attributes
    }));
    writeToCSV(flattenedItems, outputPath);
}

async function downloadPlaygroundExamples(outputPath: string) {
    const playgroundExamples = await getAllPlaygroundExamples();
    const items = playgroundExamples.data;
    // @ts-expect-error
    const flattenedItems = items.map(item => ({
        id: item.id,
        ...item.attributes
    }));
    console.log(flattenedItems);
    writeToCSV(flattenedItems, outputPath);
}

async function downloadTools(outputPath: string) {
    const tags = await getAllTools();
    const items = tags.data;
    // @ts-expect-error
    const flattenedItems = items.map(item => ({
        id: item.id,
        ...item.attributes
    }));
    writeToCSV(flattenedItems, outputPath);
}

async function uploadTags(inputPath: string) {
    const tags = fs.createReadStream(inputPath).pipe(csv());
    for await (const tag of tags) {
        console.log(tag);
        await createOrUpdateTagForCSV(tag.id, tag);
    }
}


async function main(){
    // await downloadTags("data/tags.csv");
    // await downloadTools("data/tools.csv");
    await downloadPlaygroundExamples("data/playground_examples.csv");
  
}

main();