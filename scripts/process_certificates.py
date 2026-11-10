import os
import shutil
from PIL import Image
import pypdfium2 as pdfium

SRC_DIR = "Sertifikat"
OUT_DIR = os.path.join("public", "certificates")
os.makedirs(OUT_DIR, exist_ok=True)

# Copy the merged full PDF
shutil.copy2(os.path.join(SRC_DIR, "ilovepdf_merged.pdf"), os.path.join(OUT_DIR, "all-certificates-sandi-riady.pdf"))
print("Copied all-certificates-sandi-riady.pdf")

certs = [
    {
        "id": "cert-01",
        "src": "E-Certificate V2N1 003-1.pdf",
        "pdf_name": "cert-01-call-for-paper-2022.pdf",
        "img_name": "cert-01-call-for-paper-2022.webp",
        "rotate": 0
    },
    {
        "id": "cert-02",
        "src": "Sandi Riady - Internasional.pdf",
        "pdf_name": "cert-02-international-seminar-ml-2018.pdf",
        "img_name": "cert-02-international-seminar-ml-2018.webp",
        "rotate": 270
    },
    {
        "id": "cert-03",
        "src": "Sandi Riady - NASIONAL.pdf",
        "pdf_name": "cert-03-national-seminar-ai-2018.pdf",
        "img_name": "cert-03-national-seminar-ai-2018.webp",
        "rotate": 270
    },
    {
        "id": "cert-04",
        "src": "Sandi Riady - Webinar PDMT.pdf",
        "pdf_name": "cert-04-webinar-pandemi-teknologi-2021.pdf",
        "img_name": "cert-04-webinar-pandemi-teknologi-2021.webp",
        "rotate": 0
    },
    {
        "id": "cert-05",
        "src": "Sandi riady - workshop2.pdf",
        "pdf_name": "cert-05-workshop-db-administrator-2019.pdf",
        "img_name": "cert-05-workshop-db-administrator-2019.webp",
        "rotate": 270
    },
    {
        "id": "cert-06",
        "src": "sertifikat workshop.pdf",
        "pdf_name": "cert-06-workshop-db-analysis-2019.pdf",
        "img_name": "cert-06-workshop-db-analysis-2019.webp",
        "rotate": 270
    },
    {
        "id": "cert-07",
        "src": "Sandi Riady - Pemateri.jpg",
        "pdf_name": "cert-07-pemateri-tata-cara-bersidang-2021.jpg",
        "img_name": "cert-07-pemateri-tata-cara-bersidang-2021.webp",
        "rotate": 0
    },
    {
        "id": "cert-08",
        "src": "sandy riadi-1.jpg",
        "pdf_name": "cert-08-seminar-blockchain-2021.jpg",
        "img_name": "cert-08-seminar-blockchain-2021.webp",
        "rotate": 0
    },
    {
        "id": "cert-09",
        "src": "Sandi Riady PDKR.pdf",
        "pdf_name": "cert-09-pelatihan-dasar-komasi-2021.pdf",
        "img_name": "cert-09-pelatihan-dasar-komasi-2021.webp",
        "rotate": 270
    },
    {
        "id": "cert-10",
        "src": "Sandi Riady - Webinar Komasi.png",
        "pdf_name": "cert-10-webinar-ecommerce-society50-2022.png",
        "img_name": "cert-10-webinar-ecommerce-society50-2022.webp",
        "rotate": 0
    },
    {
        "id": "cert-11",
        "src": "Sandi riady.jpg",
        "pdf_name": "cert-11-webinar-peluang-usaha-ti-2021.jpg",
        "img_name": "cert-11-webinar-peluang-usaha-ti-2021.webp",
        "rotate": 0
    },
    {
        "id": "cert-12",
        "src": "sandi riady ekternal.png",
        "pdf_name": "cert-12-webinar-russia-ui-2020.png",
        "img_name": "cert-12-webinar-russia-ui-2020.webp",
        "rotate": 0
    }
]

for item in certs:
    src_path = os.path.join(SRC_DIR, item["src"])
    dst_doc = os.path.join(OUT_DIR, item["pdf_name"])
    dst_img = os.path.join(OUT_DIR, item["img_name"])
    
    # Copy doc
    shutil.copy2(src_path, dst_doc)
    
    # Render preview
    if item["src"].lower().endswith(".pdf"):
        pdf = pdfium.PdfDocument(src_path)
        img = pdf[0].render(scale=2).to_pil()
        if item["rotate"] != 0:
            img = img.rotate(item["rotate"], expand=True)
    else:
        img = Image.open(src_path)
        if img.mode != "RGB":
            img = img.convert("RGB")
        if item["rotate"] != 0:
            img = img.rotate(item["rotate"], expand=True)
            
    # Resize thumbnail to max width 1200 for high quality & performance
    if img.width > 1200:
        ratio = 1200 / img.width
        img = img.resize((1200, int(img.height * ratio)), Image.Resampling.LANCZOS)
        
    img.save(dst_img, "WEBP", quality=90)
    print(f"Processed {item['id']}: {item['img_name']} ({img.width}x{img.height})")

print("All certificates processed successfully!")
