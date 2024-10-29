import PDFParser from "pdf2json";

const getPDFText = (buffer) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", (errData) => {
            console.error(errData.parserError);
            reject("Error parsing PDF data.");
        });

        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            if (pdfData.Pages && pdfData.Pages.length > 0) {
                const pageTexts = pdfData.Pages.map(page => {
                    return page.Texts.map(text => decodeURIComponent(text.R.map(r => r.T).join(" "))).join(" ");
                }).join("\n\n");
                resolve(pageTexts);
            } else {
                reject("No text found in PDF Pages.");
            }
        });

        pdfParser.parseBuffer(buffer);
    });
};

export async function POST(req) {
    const { file } = await req.json();

    if (!file) {
        return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    try {
        // Decode base64 to buffer
        const buffer = Buffer.from(file, "base64");
        const pdfText = await getPDFText(buffer);

        return new Response(JSON.stringify({ text: pdfText }), { status: 200 });
    } catch (error) {
        console.error("Error parsing PDF:", error);
        return new Response(JSON.stringify({ error: "Failed to parse PDF" }), { status: 500 });
    }
}
