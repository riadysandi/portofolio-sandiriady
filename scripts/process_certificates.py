import os
import shutil
from PIL import Image
import pypdfium2 as pdfium

SRC_DIR = "Sertifikat"
OUT_DIR = os.path.join("public", "certificates")
os.makedirs(OUT_DIR, exist_ok=True)

# 1. Process merged PDF and fix upside-down pages
merged_pdf_path = os.path.join(SRC_DIR, "ilovepdf_merged.pdf")
merged_out_path = os.path.join(OUT_DIR, "all-certificates-sandi-riady.pdf")

merged_pdf = pdfium.PdfDocument(merged_pdf_path)
for page_idx in [1, 2, 4, 5, 6]:
    merged_pdf[page_idx].set_rotation(270)

merged_pdf.save(merged_out_path)
print("Updated all-certificates-sandi-riady.pdf with correct page rotations.")

certs = [
    {
        "id": "cert-01",
        "src": "E-Certificate V2N1 003-1.pdf",
        "pdf_name": "cert-01-call-for-paper-2022.pdf",
        "img_name": "cert-01-call-for-paper-2022.webp",
        "pdf_rotation": 0
    },
    {
        "id": "cert-02",
        "src": "Sandi Riady - Internasional.pdf",
        "pdf_name": "cert-02-international-seminar-ml-2018.pdf",
        "img_name": "cert-02-international-seminar-ml-2018.webp",
        "pdf_rotation": 270
    },
    {
        "id": "cert-03",
        "src": "Sandi Riady - NASIONAL.pdf",
        "pdf_name": "cert-03-national-seminar-ai-2018.pdf",
        "img_name": "cert-03-national-seminar-ai-2018.webp",
        "pdf_rotation": 270
    },
    {
        "id": "cert-04",
        "src": "Sandi Riady - Webinar PDMT.pdf",
        "pdf_name": "cert-04-webinar-pandemi-teknologi-2021.pdf",
        "img_name": "cert-04-webinar-pandemi-teknologi-2021.webp",
        "pdf_rotation": 0
    },
    {
        "id": "cert-05",
        "src": "Sandi riady - workshop2.pdf",
        "pdf_name": "cert-05-workshop-db-administrator-2019.pdf",
        "img_name": "cert-05-workshop-db-administrator-2019.webp",
        "pdf_rotation": 270
    },
    {
        "id": "cert-06",
        "src": "sertifikat workshop.pdf",
        "pdf_name": "cert-06-workshop-db-analysis-2019.pdf",
        "img_name": "cert-06-workshop-db-analysis-2019.webp",
        "pdf_rotation": 270
    },
    {
        "id": "cert-07",
        "src": "Sandi Riady - Pemateri.jpg",
        "pdf_name": "cert-07-pemateri-tata-cara-bersidang-2021.jpg",
        "img_name": "cert-07-pemateri-tata-cara-bersidang-2021.webp",
        "pdf_rotation": 0
    },
    {
        "id": "cert-08",
        "src": "sandy riadi-1.jpg",
        "pdf_name": "cert-08-seminar-blockchain-2021.jpg",
        "img_name": "cert-08-seminar-blockchain-2021.webp",
        "pdf_rotation": 0
    },
    {
        "id": "cert-09",
        "src": "Sandi Riady PDKR.pdf",
        "pdf_name": "cert-09-pelatihan-dasar-komasi-2021.pdf",
        "img_name": "cert-09-pelatihan-dasar-komasi-2021.webp",
        "pdf_rotation": 270
    },
    {
        "id": "cert-10",
        "src": "Sandi Riady - Webinar Komasi.png",
        "pdf_name": "cert-10-webinar-ecommerce-society50-2022.png",
        "img_name": "cert-10-webinar-ecommerce-society50-2022.webp",
        "pdf_rotation": 0
    },
    {
        "id": "cert-11",
        "src": "Sandi riady.jpg",
        "pdf_name": "cert-11-webinar-peluang-usaha-ti-2021.jpg",
        "img_name": "cert-11-webinar-peluang-usaha-ti-2021.webp",
        "pdf_rotation": 0
    },
    {
        "id": "cert-12",
        "src": "sandi riady ekternal.png",
        "pdf_name": "cert-12-webinar-russia-ui-2020.png",
        "img_name": "cert-12-webinar-russia-ui-2020.webp",
        "pdf_rotation": 0
    }
]

for item in certs:
    src_path = os.path.join(SRC_DIR, item["src"])
    dst_doc = os.path.join(OUT_DIR, item["pdf_name"])
    dst_img = os.path.join(OUT_DIR, item["img_name"])

    if item["src"].lower().endswith(".pdf"):
        pdf = pdfium.PdfDocument(src_path)
        if item["pdf_rotation"] != 0:
            pdf[0].set_rotation(item["pdf_rotation"])
        # Save rotated PDF document
        pdf.save(dst_doc)
        # Render image directly with rotation applied
        img = pdf[0].render(scale=2).to_pil()
    else:
        # Static image copy
        shutil.copy2(src_path, dst_doc)
        img = Image.open(src_path)
        if img.mode != "RGB":
            img = img.convert("RGB")

    # Resize thumbnail to max width 1200 for clean responsive rendering
    if img.width > 1200:
        ratio = 1200 / img.width
        img = img.resize((1200, int(img.height * ratio)), Image.Resampling.LANCZOS)

    img.save(dst_img, "WEBP", quality=92)
    print(f"Processed {item['id']}: {item['img_name']} ({img.width}x{img.height})")

print("All certificates re-processed with upright orientation!")
