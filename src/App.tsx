import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Plus, Minus, X, Truck, Store, Banknote,
  Landmark, ChevronLeft, Check, MessageCircle, Sparkles, Search, Clock, MapPin, Copy
} from "lucide-react";

/* ============================================================
   CONFIGURACIÓN DEL LOCAL — para editar según el negocio real
   ============================================================ */
const STORE_NAME = "Química Ferro";
const STORE_TAGLINE = "Limpieza, bazar y artículos para el hogar";
const WHATSAPP_NUMBER = "5491154647972"; // del catálogo: 11 5464-7972 — revisar que sea el numero correcto de WhatsApp
const STORE_ADDRESS = "Altolaguirre 1427/29, C.A.B.A.";
const STORE_HOURS = "Lun a vie de 16 a 20 hs · Sáb de 10 a 13 hs";
const MP_ALIAS = "quimicaferro"; // alias de Mercado Pago para transferencias

const colors = {
  bg: "#F6FBFA",
  primary: "#0D5C52",
  primaryDark: "#092F2A",
  lime: "#E91E63",
  mint: "#E3F3EE",
  mintDark: "#C7E6DD",
  ink: "#10201D",
  coral: "#FF6B4A",
  white: "#FFFFFF",
  gray: "#6B7A76",
};

const categories = [
  { id: "lavanderia", label: "Lavandería", emoji: "👕" }, // 28 productos
  { id: "limpiadores", label: "Limpiadores", emoji: "🧽" }, // 35 productos
  { id: "pisos", label: "Pisos", emoji: "🪣" }, // 12 productos
  { id: "detergentes", label: "Detergentes", emoji: "🧴" }, // 7 productos
  { id: "papel", label: "Papel", emoji: "🧻" }, // 20 productos
  { id: "bazar", label: "Bazar", emoji: "🏠" }, // 226 productos
  { id: "cosmetica-automotor", label: "Cosmética automotor", emoji: "🚗" }, // 20 productos
  { id: "piscina", label: "Piscina", emoji: "🏊" }, // 14 productos
  { id: "fuego", label: "Fuego", emoji: "🔥" }, // 9 productos
  { id: "papeleria", label: "Papelería", emoji: "✏️" }, // 15 productos
  { id: "alcohol", label: "Alcohol", emoji: "🧪" }, // 8 productos
  { id: "bazar-especial", label: "Bazar especial", emoji: "✨" }, // 14 productos
];

const products = [
  { id: 1, code: "159", group: "159-160", name: "Apresto para Ropa 1 litro", price: 2600, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 2, code: "160", group: "159-160", name: "Apresto para Ropa 5 litros", price: 7900, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 3, code: "428", group: null, name: "Aromatizador textil Smell 200cc", price: 6200, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 4, code: "401", group: null, name: "Pastillas Limpia Lavarropas", price: 1500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 5, code: "01", group: "01-02", name: "Jabón Líquido para Ropa tipo Skip Clásico 1 litro", price: 2400, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 6, code: "02", group: "01-02", name: "Jabón Líquido para Ropa tipo Skip Clásico 5 litros", price: 7500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 7, code: "03", group: "03-04", name: "Jabón Líquido para Ropa tipo Ariel Clásico 1 litro", price: 2400, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 8, code: "04", group: "03-04", name: "Jabón Líquido para Ropa tipo Ariel Clásico 5 litros", price: 7500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 9, code: "05", group: "05-06", name: "Jabón Líquido para Ropa tipo Skip Premiun 1 litro", price: 2700, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 10, code: "06", group: "05-06", name: "Jabón Líquido para Ropa tipo Skip Premiun 5 litros", price: 9500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 11, code: "07", group: "07-08", name: "Jabón Líquido para Ropa tipo Ariel Premiun 1 litro", price: 2700, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 12, code: "08", group: "07-08", name: "Jabón Líquido para Ropa tipo Ariel Premiun 5 litros", price: 9500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 13, code: "09", group: "09-10", name: "Jabon Líquido Ropa Delicada tipo Camellito 1 litro", price: 2600, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 14, code: "10", group: "09-10", name: "Jabon Líquido Ropa Delicada tipo Camellito 5 litros", price: 9900, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 15, code: "15", group: "15-16", name: "Lavandina Ropa Blanca 1 litro", price: 1200, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 16, code: "16", group: "15-16", name: "Lavandina Ropa Blanca 5 litros", price: 3500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 17, code: "17", group: "17-18", name: "Lavandina Ropa Color 1 litro", price: 1200, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 18, code: "18", group: "17-18", name: "Lavandina Ropa Color 5 litros", price: 3500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 19, code: "21", group: "21-22", name: "Perfumina para Ropa fragancias varias 1 litro", price: 5900, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 20, code: "22", group: "21-22", name: "Perfumina para Ropa fragancias varias 5 litros", price: 23500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 21, code: "19", group: "19-20", name: "Quita Manchas Textil 1 litro", price: 2800, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 22, code: "20", group: "19-20", name: "Quita Manchas Textil 5 litros", price: 8500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 23, code: "200", group: null, name: "Quitamanchas Trenet bolilla", price: 0, category: "lavanderia", emoji: "👕", unavailable: true },
  { id: 24, code: "273", group: null, name: "Quitamanchas Trenet Doypack 400CC", price: 2500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 25, code: "11", group: "11-12", name: "Suavizante Celeste tipo Vivere 1 litro", price: 2000, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 26, code: "12", group: "11-12", name: "Suavizante Celeste tipo Vivere 5 litros", price: 6000, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 27, code: "13", group: "13-14", name: "Suavizante Premiun Máxima Fragancia 1 litro", price: 2300, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 28, code: "14", group: "13-14", name: "Suavizante Premiun Máxima Fragancia 5 litros", price: 7400, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 29, code: "35", group: "35-36", name: "Desengrasante Odex tipo Mr. Musculo 1 litro", price: 1600, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 30, code: "36", group: "35-36", name: "Desengrasante Odex tipo Mr. Musculo 5 litros", price: 5600, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 31, code: "23", group: "23-24", name: "Desengrasante Multiuso cocina y baño 1 litro", price: 1700, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 32, code: "24", group: "23-24", name: "Desengrasante Multiuso cocina y baño 5 litros", price: 5900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 33, code: "25", group: "25-26", name: "Desengrasante Industrial Limpia Hornos 1 litro", price: 2300, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 34, code: "26", group: "25-26", name: "Desengrasante Industrial Limpia Hornos 5 litros", price: 6900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 35, code: "161", group: "161-162", name: "Desengrasante Amoniacal 1 litro", price: 2200, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 36, code: "162", group: "161-162", name: "Desengrasante Amoniacal 5 litros", price: 8000, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 37, code: "326", group: "326-327", name: "Desengrasante Total Remo. 1 litro", price: 4900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 38, code: "327", group: "326-327", name: "Desengrasante Total Remo. 5 litros", price: 15900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 39, code: "145", group: "145-146", name: "Destapa Cañerias 1 litro", price: 5500, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 40, code: "146", group: "145-146", name: "Destapa Cañerias 5 litros", price: 23900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 41, code: "264", group: null, name: "Destapa Cañerias Zelnova x900ml", price: 4600, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 42, code: "37", group: "37-38", name: "Jabón Líquido para Manos fragancias varias 1 litro", price: 2700, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 43, code: "38", group: "37-38", name: "Jabón Líquido para Manos fragancias varias 5 litros", price: 9300, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 44, code: "29", group: "29-30", name: "Lavandina en Gel multisuperficies 1 litro", price: 2000, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 45, code: "30", group: "29-30", name: "Lavandina en Gel multisuperficies 5 litros", price: 7500, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 46, code: "137", group: null, name: "Limpia Metales Venus 225cc", price: 5900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 47, code: "168", group: null, name: "Limpia Metales Venus 425 cc", price: 7900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 48, code: "31", group: "31-32", name: "Limpiador Cif Cremoso Ferro 1 litro", price: 3900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 49, code: "32", group: "31-32", name: "Limpiador Cif Cremoso Ferro 5 litros", price: 16000, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 50, code: "206", group: null, name: "Lustramuebles CIF gatillo", price: 5300, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 51, code: "178", group: null, name: "Limpiador CIF Pisos plastificados y flotantes", price: 7300, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 52, code: "272", group: null, name: "Limpiador BLEM Pisos plastificados y flotantes", price: 7600, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 53, code: "116", group: null, name: "Limpiador Suiza pisos marmol y concreto 900 cc", price: 4800, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 54, code: "149", group: null, name: "Limpiador Suiza pisos plastificados y flotantes 900 cc", price: 5100, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 55, code: "27", group: "27-28", name: "Limpia Vidrios Ferro 1 litro", price: 2100, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 56, code: "28", group: "27-28", name: "Limpia Vidrios Ferro 5 litros", price: 5900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 57, code: "102", group: null, name: "Lustra Muebles Ceramicol 360 CC", price: 0, category: "limpiadores", emoji: "🧽", unavailable: true },
  { id: 58, code: "148", group: null, name: "Lustra Muebles Danubio 360cc", price: 5400, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 59, code: "270", group: null, name: "Quita Sarro Rex x 500ml", price: 3900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 60, code: "170", group: null, name: "Quita Sarro Harpic x 500ml", price: 5900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 61, code: "33", group: "33-34", name: "Quita Sarro multisuperficies Ferro 1 litro", price: 1900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 62, code: "34", group: "33-34", name: "Quita Sarro multisuperficies Ferro 5 litros", price: 7000, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 63, code: "226", group: null, name: "Limpiador CIF Pisos Oxy-Gel 750 ML", price: 6700, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 64, code: "45", group: "45-46", name: "Desinfectante para pisos Lisoform 1 litro", price: 1400, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 65, code: "46", group: "45-46", name: "Desinfectante para pisos Lisoform 5 litros", price: 3900, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 66, code: "47", group: "47-48", name: "Desinfectante para pisos Citronela 1 litro", price: 1400, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 67, code: "48", group: "47-48", name: "Desinfectante para pisos Citronela 5 litros", price: 3900, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 68, code: "49", group: "49-50", name: "Desinfectante para pisos fragancias varias 1 litro", price: 1400, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 69, code: "50", group: "49-50", name: "Desinfectante para pisos fragancias varias 5 litros", price: 3900, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 70, code: "165", group: "165-166", name: "Echo en el balde Ferro 1 litro", price: 1800, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 71, code: "166", group: "165-166", name: "Echo en el balde Ferro 5 litros", price: 6000, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 72, code: "129", group: "129-130", name: "Desinfectante Acaroína 1 litro", price: 2900, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 73, code: "130", group: "129-130", name: "Desinfectante Acaroína 5 litros", price: 8900, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 74, code: "51", group: "51-52", name: "Lavandina Tradicional 1 litro", price: 1200, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 75, code: "52", group: "51-52", name: "Lavandina Tradicional 5 litros", price: 3500, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 76, code: "39", group: "39-40", name: "Detergente tipo Ala lavavajillas 1 litro", price: 2900, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 77, code: "40", group: "39-40", name: "Detergente tipo Ala lavavajillas 5 litros", price: 9500, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 78, code: "41", group: "41-42", name: "Detergente Neutro lavavajillas 1 litro", price: 3000, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 79, code: "42", group: "41-42", name: "Detergente Neutro lavavajillas 5 litros", price: 9700, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 80, code: "43", group: "43-44", name: "Detergente Premiun lavavajillas 1 litro", price: 3200, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 81, code: "44", group: "43-44", name: "Detergente Premiun lavavajillas 5 litros", price: 9900, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 82, code: "372", group: null, name: "Tabletas lavavajillas x 10", price: 5400, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 83, code: "367", group: null, name: "Pañuelos Elegante ind.", price: 400, category: "papel", emoji: "🧻", unavailable: false },
  { id: 84, code: "191", group: null, name: "Papel Bobina Eco x 2 unidades 2.000 usos", price: 19300, category: "papel", emoji: "🧻", unavailable: false },
  { id: 85, code: "77", group: null, name: "Papel Higiénico bolsón 10 rollos Doble Hoja premium 30 mts.", price: 0, category: "papel", emoji: "🧻", unavailable: true },
  { id: 86, code: "76", group: null, name: "Papel Higiénico Simple Hoja Individual 80 mts.", price: 1400, category: "papel", emoji: "🧻", unavailable: false },
  { id: 87, code: "252", group: null, name: "Papel Higiénico Simple Hoja 4x80 mts.", price: 0, category: "papel", emoji: "🧻", unavailable: true },
  { id: 88, code: "188", group: null, name: "Papel Higiénico bolsón 10 rollos Simple Hoja premium 70 mts.", price: 10800, category: "papel", emoji: "🧻", unavailable: false },
  { id: 89, code: "356", group: null, name: "Papel Higiénico Doble Hoja 4x30mts. Higienol", price: 3600, category: "papel", emoji: "🧻", unavailable: false },
  { id: 90, code: "236", group: null, name: "Papel Higiénico bolsón 12 rollos Doble Hoja premium 30 mts.", price: 10500, category: "papel", emoji: "🧻", unavailable: false },
  { id: 91, code: "78", group: null, name: "Papel Higiénico bolsón 6 rollos Doble Hoja premium 100 mts.", price: 11600, category: "papel", emoji: "🧻", unavailable: false },
  { id: 92, code: "187", group: null, name: "Papel Higiénico bolsón 12 rollos triple hoja premium 20 mts.", price: 0, category: "papel", emoji: "🧻", unavailable: true },
  { id: 93, code: "79", group: null, name: "Papel Higiénico bolsón 10 rollos Triple Hoja premium 30 mts.", price: 11800, category: "papel", emoji: "🧻", unavailable: false },
  { id: 94, code: "225", group: null, name: "Papel Higiénico Elegante 8x300 mts. Cono grande Premium", price: 34900, category: "papel", emoji: "🧻", unavailable: false },
  { id: 95, code: "301", group: null, name: "Rollo de Cocina Individual 200 paños económico", price: 2200, category: "papel", emoji: "🧻", unavailable: false },
  { id: 96, code: "81", group: null, name: "Rollo de Cocina Individual 200 paños premium", price: 2600, category: "papel", emoji: "🧻", unavailable: false },
  { id: 97, code: "80", group: null, name: "Rollos de Cocina Bolsón 8 rollos x 200 paños c/u premium", price: 18900, category: "papel", emoji: "🧻", unavailable: false },
  { id: 98, code: "82", group: null, name: "Rollos de Cocina Paq. 3 rollos x 120 paños premium", price: 4700, category: "papel", emoji: "🧻", unavailable: false },
  { id: 99, code: "355", group: null, name: "Paq. Servilletas 32 x 27 x80 uds.", price: 1600, category: "papel", emoji: "🧻", unavailable: false },
  { id: 100, code: "190", group: null, name: "Caja Servilletas 32 x 27 x 1.000 unidades New pel", price: 11900, category: "papel", emoji: "🧻", unavailable: false },
  { id: 101, code: "189", group: null, name: "Toallas Intercaladas genéricas 24x19 4 paneles", price: 12500, category: "papel", emoji: "🧻", unavailable: false },
  { id: 102, code: "192", group: null, name: "Toallas Intercaladas Premium 24x19 4 paneles", price: 14900, category: "papel", emoji: "🧻", unavailable: false },
  { id: 103, code: "124", group: null, name: "Antihumedad escamas 1/2 kg.", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 104, code: "125", group: null, name: "Bicarbonato de sodio 1/2 kilo", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 105, code: "423", group: null, name: "Borax 200gs", price: 2300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 106, code: "126", group: null, name: "Percarbonato de Sodio 1/4 Kilo (Blanqueador)", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 107, code: "127", group: null, name: "Percarbonato de Sodio 1 Kilo (Blanqueador)", price: 11500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 108, code: "204", group: null, name: "Ácido Cítrico 200 gr. (Eliminador de sarro)", price: 2700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 109, code: "431", group: null, name: "Desinfectante Amonio 1Litro", price: 2400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 110, code: "432", group: null, name: "Desinfectante Amonio 5Litros", price: 7500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 111, code: "305", group: null, name: "Aromatizante Ambiente Aero Smell Fresh Frag.varias", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 112, code: "316", group: null, name: "Aparato aromatizantes", price: 10500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 113, code: "213", group: null, name: "Algodón Baby Precortado 100gr", price: 2500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 114, code: "214", group: null, name: "Algodón Baby Paños 40 unidades", price: 3800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 115, code: "343", group: null, name: "Antorchitas p/prender Horno", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 116, code: "427", group: null, name: "Antihumedad Air Pur 2 x 250gs", price: 14900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 117, code: "394", group: null, name: "Antihumedad frag.varias repuesto", price: 6300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 118, code: "113", group: null, name: "Balde 10 lts. Mr. trapo", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 119, code: "195", group: null, name: "Balde 9 lts. Colores", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 120, code: "351", group: null, name: "Balde traslucido 10 lts.", price: 5400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 121, code: "112", group: null, name: "Balde 10 lts. Florida", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 122, code: "152", group: null, name: "Balde 12 litros Florida", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 123, code: "255", group: null, name: "Balde 13lts. c/manija metálica", price: 6400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 124, code: "256", group: null, name: "Combo Balde + Escurridor 13lts.", price: 10500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 125, code: "392", group: null, name: "Barrehojas", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 126, code: "55", group: null, name: "Bolsas residuos negras 45x60 x 10 unidades", price: 700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 127, code: "56", group: null, name: "Bolsas residuos negras 50x70 x 10 unidades", price: 1100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 128, code: "57", group: null, name: "Bolsas residuos negras 60x90 x 10 unidades", price: 1600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 129, code: "58", group: null, name: "Bolsas residuos negras 70x100 x 10 unidades", price: 2100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 130, code: "59", group: null, name: "Bolsas residuos negras 80x110 x 10 unidades", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 131, code: "60", group: null, name: "Bolsas residuos negras 90x120 x 10 unidades", price: 3800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 132, code: "144", group: null, name: "Bolsas residuos verdes 80x110 x 10 unidades", price: 4300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 133, code: "169", group: null, name: "Bolsas residuos verdes 80x110 x 50 unidades", price: 20000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 134, code: "107", group: null, name: "Broches para ropa x 12 unidades", price: 1800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 135, code: "158", group: null, name: "Cabo Barrendero", price: 4400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 136, code: "120", group: null, name: "Cabo Madera 1,30 mts.", price: 1900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 137, code: "335", group: null, name: "Cabo Madera 1,20 mts. Premium", price: 2200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 138, code: "121", group: null, name: "Cabo Madera 1,50 mts.", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 139, code: "258", group: null, name: "Cabo Madera 1,80 mts.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 140, code: "398", group: null, name: "Cabo Madera 2 mts.", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 141, code: "336", group: null, name: "Cabo Madera forrado 1,20 mts.", price: 2600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 142, code: "72", group: null, name: "Cabo Metálico 1,20 mts.", price: 2700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 143, code: "164", group: null, name: "Cabo Metálico Virulana", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 144, code: "110", group: null, name: "Cepillo mutiuso con mango Extralimp", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 145, code: "119", group: null, name: "Cepillo Planchita", price: 3200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 146, code: "352", group: null, name: "Cepillo Limpia Mamaderas / Vasos", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 147, code: "349", group: null, name: "Cepillo Piso vinilico esp.", price: 3600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 148, code: "395", group: null, name: "Quita pelusas Make", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 149, code: "370", group: null, name: "Set baño cortina-ganchos-alf.microfibra", price: 16900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 150, code: "337", group: null, name: "Cortina p/Ducha 1,80x1,80 vinilica", price: 9000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 151, code: "396", group: null, name: "Cuñas traba puertas", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 152, code: "338", group: null, name: "Protector cortina baño", price: 5800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 153, code: "339", group: null, name: "Ganchos plast.cortina baño", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 154, code: "424", group: null, name: "Desinfectante ambientes Smell Fresh Fraqgancias varias", price: 4100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 155, code: "103", group: null, name: "Desodorante Glade Aero. 360 CC", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 156, code: "171", group: null, name: "Desodorante Lysoform Aero.", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 157, code: "267", group: null, name: "Difusor con Varillas Ferro", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 158, code: "425", group: null, name: "Dispenser jabon liquido", price: 5400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 159, code: "420", group: null, name: "Encendedor clasico a gas", price: 700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 160, code: "224", group: null, name: "Embudo Chico", price: 2100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 161, code: "292", group: null, name: "Embudo Grande", price: 3600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 162, code: "223", group: null, name: "Escencia para Hornillo Fragancias", price: 3200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 163, code: "340", group: null, name: "Escoba super Samantha", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 164, code: "341", group: null, name: "Escoba con aletas", price: 3400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 165, code: "163", group: null, name: "Escoba grande de paja 6 hilos", price: 12500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 166, code: "115", group: null, name: "Escobilla de Baño Inodoro", price: 4100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 167, code: "186", group: null, name: "Escobillón + Cabo Armado", price: 5800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 168, code: "157", group: null, name: "Escobillón Cepillo Barrendero chico", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 169, code: "156", group: null, name: "Escobillón Cepillo Barrendero grande", price: 11700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 170, code: "203", group: null, name: "Escobillón Recto", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 171, code: "308", group: null, name: "Escobillón Recto Bicolor medio", price: 3400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 172, code: "303", group: null, name: "Escobillón Recto Laqueado", price: 5600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 173, code: "73", group: null, name: "Escobillón Curvo", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 174, code: "246", group: null, name: "Escurridor para Balde 13lts.", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 175, code: "65", group: null, name: "Esponja de Acero 30 gr.", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 176, code: "75", group: null, name: "Esponja Lavavajillas económica", price: 900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 177, code: "63", group: null, name: "Esponja Lavavajillas Intermedia con salva uñas", price: 1300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 178, code: "64", group: null, name: "Esponja Lavavajillas XXL Premium", price: 1600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 179, code: "330", group: null, name: "Esponja Spugnella Antiadherente", price: 2100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 180, code: "66", group: null, name: "Estropajo de Acero profesional", price: 1700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 181, code: "68", group: null, name: "Franela Naranja 50x40", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 182, code: "321", group: null, name: "Fuenton 14lts Florida", price: 5700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 183, code: "155", group: null, name: "Fuenton 16lts Florida", price: 6900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 184, code: "320", group: null, name: "Fuenton 17lts traslúcido", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 185, code: "216", group: null, name: "Fuenton 20lts", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 186, code: "297", group: null, name: "Fuenton 28lts", price: 10400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 187, code: "322", group: null, name: "Fuenton 35lts", price: 12900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 188, code: "150", group: null, name: "Guantes Moteados talle único", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 189, code: "139", group: null, name: "Guantes Afelpado Denario \"L\"", price: 2400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 190, code: "71", group: null, name: "Guante Afelpado Make \"S-M\"", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 191, code: "400", group: null, name: "Guante 1/2 Naranja promax", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 192, code: "399", group: null, name: "Guante 1/2 Naranja eternal", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 193, code: "293", group: null, name: "Guante Afelpado Mapa \"S-M-L\"", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 194, code: "363", group: null, name: "Guantes Nitrilo descartables Grande x 100", price: 10500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 195, code: "307", group: null, name: "Hormiguicida cebo granulado verde", price: 2900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 196, code: "174", group: null, name: "Hormiguicida Granulado 200 gs", price: 7400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 197, code: "173", group: null, name: "Hormiguicida Polvo", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 198, code: "371", group: null, name: "Insecticida Cucarachicida Cebo", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 199, code: "212", group: null, name: "Insecticida Cucarachicida Jeringa", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 200, code: "426", group: null, name: "Insecticida Escudo Aero Hogar y jardin", price: 6200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 201, code: "99", group: null, name: "Insecticida Escudo Aero Mata Cucarachas y Hormigas", price: 4400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 202, code: "100", group: null, name: "Insecticida Escudo Aero Mata Moscas y Mosquitos", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 203, code: "101", group: null, name: "Insecticida Escudo Aero Mata Moscas y Mosquitos Sin Olor", price: 4400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 204, code: "262", group: null, name: "Insecticida Escudo Aero Mata Polillas y Larvas", price: 5500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 205, code: "298", group: null, name: "Insecticida Escudo Aero Pulgas y Garrapatas", price: 5500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 206, code: "299", group: null, name: "Insecticida Escudo Aero jejenes etc.", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 207, code: "176", group: null, name: "Insecticida Espiral Raid 12ud. Lavanda", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 208, code: "98", group: null, name: "Insecticida Espirales Mat Iris x 12ud.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 209, code: "141", group: null, name: "Insecticida Espirales Raid x 4ud.", price: 1300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 210, code: "128", group: null, name: "Insecticida Jeringa Geltek hormigas", price: 5400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 211, code: "222", group: null, name: "Insecticida K-Otrina sobre p/diluir", price: 3100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 212, code: "142", group: null, name: "Insecticida OFF family 170 cc", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 213, code: "324", group: null, name: "Insecticida Raid Aero Cucarachas 360cc", price: 6600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 214, code: "325", group: null, name: "Insecticida Raid Aero Moscas y Mosquitos 360 cc", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 215, code: "140", group: null, name: "Insecticida Raid Aero Moscas y Mosquitos 360 cc Sin Olor", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 216, code: "132", group: null, name: "Insecticida Raid Tabletas x 12ud.", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 217, code: "199", group: null, name: "Insecticida Raid Tabletas x 24ud.", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 218, code: "404", group: null, name: "Jabon de tocador Nivea 125gr.", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 219, code: "405", group: null, name: "Jabon de tocador Lux 120gr.", price: 1900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 220, code: "416", group: null, name: "Jabon de tocador Lux 120gr. X 3 uni.", price: 4800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 221, code: "417", group: null, name: "Jabon de tocador Rexona 125gr.", price: 1200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 222, code: "418", group: null, name: "Jabon de tocador Dove 90gr.", price: 2400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 223, code: "117", group: null, name: "Jabón en Pan 150gr.", price: 1200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 224, code: "194", group: null, name: "Jabón en Pan Argentino 200gr.", price: 1600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 225, code: "108", group: null, name: "Jabón en Pan Seiseme 300gr.", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 226, code: "70", group: null, name: "Lana de Acero XXL 60gr.", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 227, code: "69", group: null, name: "Lana de Acero rollitos x 10ud.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 228, code: "254", group: null, name: "Rollito Virulana x10ud.", price: 2900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 229, code: "421", group: null, name: "Lampara candela 9W calida unidad", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 230, code: "422", group: null, name: "Lampara candela 10W fria unidad", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 231, code: "198", group: null, name: "Limpiatecho Globo", price: 3700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 232, code: "134", group: null, name: "Limpiatecho multiuso Samantha", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 233, code: "172", group: null, name: "Lubricante RG2 Escudo", price: 6900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 234, code: "205", group: null, name: "Lustra Muebles Blem 360cc", price: 6100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 235, code: "244", group: null, name: "Lampazo/Mopa Royco Algodón 180gr.", price: 3100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 236, code: "269", group: null, name: "Lampazo/Mopa Royco Algodón 280gr.", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 237, code: "429", group: null, name: "Lampazo Tiras Amarillas", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 238, code: "342", group: null, name: "Mopa Algodón Mr.Trapo", price: 5200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 239, code: "245", group: null, name: "Mopa Microfibra Mr.Trapo", price: 4800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 240, code: "323", group: null, name: "Mopa Centrífuga", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 241, code: "414", group: null, name: "Esponja abrasiva verde x1", price: 1000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 242, code: "306", group: null, name: "Paño fibra verde abrasiva x 2 unidades", price: 1700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 243, code: "357", group: null, name: "Paño fibra negra abrasiva grueso x 1 unidad", price: 1700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 244, code: "106", group: null, name: "Pala con Cabo Común", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 245, code: "131", group: null, name: "Pala con Cabo Premiun", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 246, code: "105", group: null, name: "Pala con Cabo y Goma", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 247, code: "114", group: null, name: "Pala plástica común", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 248, code: "318", group: null, name: "Palangana 4lts.", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 249, code: "319", group: null, name: "Palangana 6lts.", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 250, code: "123", group: null, name: "Palangana 9lts.", price: 5300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 251, code: "122", group: null, name: "Paño Amarillo Piso 50x60", price: 3200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 252, code: "67", group: null, name: "Paño Amarillo tipo Ballerina", price: 800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 253, code: "177", group: null, name: "Paño Microfibra 40x60", price: 5600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 254, code: "221", group: null, name: "Pastillas para Mingitorio", price: 8500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 255, code: "202", group: null, name: "Pato bloque adhesivo x3ud.", price: 4200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 256, code: "201", group: null, name: "Pato Pastilla para Mochila 40 Gs.", price: 4600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 257, code: "353", group: null, name: "Pato Pastilla Inodoro", price: 2400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 258, code: "109", group: null, name: "Desodorante Canasta Sólida Glade", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 259, code: "263", group: null, name: "Desodorante Canasta Sólida Glade Repuesto", price: 1900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 260, code: "350", group: null, name: "Desodorante Glade Toque frag.", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 261, code: "397", group: null, name: "Plumero cola de gato", price: 7900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 262, code: "220", group: null, name: "Plumero Microfibra", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 263, code: "309", group: null, name: "Gatillo Individual", price: 900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 264, code: "317", group: null, name: "Pulverizador Gatillo 200 ml", price: 1400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 265, code: "143", group: null, name: "Pulverizador Gatillo 500 ml", price: 1700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 266, code: "97", group: null, name: "Pulverizador Make 750 Ml. Con gatillo", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 267, code: "418", group: null, name: "Pulverizador Make 1000 Ml. Con gatillo", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 268, code: "329", group: null, name: "Pulverizador Profesional 1 litro Con gatillo", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 269, code: "211", group: null, name: "Raticida Bloques x 9ud.", price: 9000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 270, code: "345", group: null, name: "Repasador Microfibra 37x60 1/2 Naranja", price: 4100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 271, code: "393", group: null, name: "Repasador Premium", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 272, code: "344", group: null, name: "Repasador toalla estampado 40x60 cm", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 273, code: "268", group: null, name: "Repasador Guarda Francesa 50x55 cm", price: 2900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 274, code: "133", group: null, name: "Sahumerios Varias Fragancias x 10ud. Triple Empaste", price: 1800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 275, code: "135", group: null, name: "Secador Negro Goma corto 26cm", price: 2700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 276, code: "289", group: null, name: "Secador Doble Goma calidad Premium 35cm", price: 3400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 277, code: "74", group: null, name: "Secador Doble Goma calidad Premium 41cm", price: 3600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 278, code: "167", group: null, name: "Secador Doble Goma Samantha 43cm.", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 279, code: "242", group: null, name: "Secador Aquarapid 30cm", price: 5600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 280, code: "243", group: null, name: "Secador Aquarapid 40cm", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 281, code: "185", group: null, name: "Secador Economico Armado", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 282, code: "193", group: null, name: "Secador Negro Genérico corto", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 283, code: "295", group: null, name: "Secador Secarapid Virulana x30cm", price: 5300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 284, code: "197", group: null, name: "Secador Secarapid Virulana x40cm", price: 6300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 285, code: "302", group: null, name: "Secador Vidrios 24 cm una pieza", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 286, code: "196", group: null, name: "Secador Vidrios 20 cm. Virulana", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 287, code: "402", group: null, name: "Secador de vidrios Laffitte 20cm", price: 3800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 288, code: "361", group: null, name: "Secador Vidrios con Cabo y Esp. Samantha", price: 6800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 289, code: "332", group: null, name: "Sopapita Flopy", price: 4300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 290, code: "118", group: null, name: "Sopapa Negra Make", price: 3200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 291, code: "151", group: null, name: "Sopapa Negra con cabo", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 292, code: "413", group: null, name: "Sopapon con cabo largo", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 293, code: "391", group: null, name: "Trampera Ratas", price: 4000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 294, code: "61", group: null, name: "Trapo de piso gris costurado", price: 2000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 295, code: "62", group: null, name: "Trapo de piso rayado premiun", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 296, code: "217", group: null, name: "Trapo de piso consorcio Maxi", price: 3800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 297, code: "153", group: null, name: "Trapo rejilla pabilo calado (Panal de abejas)", price: 1400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 298, code: "154", group: null, name: "Trapo rejilla cerrada", price: 1600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 299, code: "209", group: "209-210", name: "Vinagre Limpieza al 10% (NO COMESTIBLE) 1 litro", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 300, code: "210", group: "209-210", name: "Vinagre Limpieza al 10% (NO COMESTIBLE) 5 litros", price: 10900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 301, code: "348", group: null, name: "Cesto residuos vaiven 6lts.", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 302, code: "313", group: null, name: "Cesto Residuos Pedal 13 Lts.", price: 17000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 303, code: "403", group: null, name: "Cesto residuos 70 litros c/ Tapa", price: 35900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 304, code: "227", group: null, name: "Cesto c/tapa 34LTS.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 305, code: "310", group: null, name: "Cera Suiza Liq. Mad. Roble Claro 850cc", price: 9900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 306, code: "311", group: null, name: "Cera Suiza Past.Roble Claro 450cc", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 307, code: "274", group: null, name: "Cera Ferro Pisos Madera y Mosaicos 1 Lt.", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 308, code: "430", group: null, name: "Cera Incolora Ceramica y Marmol", price: 3400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 309, code: "228", group: null, name: "Cera Suiza Pisos Plast. y Flot. 850cc", price: 9300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 310, code: "232", group: null, name: "Pasa Cera Make", price: 3700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 311, code: "229", group: null, name: "Pasa Cera Samantha", price: 6900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 312, code: "230", group: null, name: "Vinagre de Alcohol X1lt.", price: 1900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 313, code: "300", group: null, name: "Vinagre de Alcohol X5lt.", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 314, code: "231", group: null, name: "Repuesto Limp. Multisuperficies Cif x400ml", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 315, code: "233", group: null, name: "Cera Líquida Madera Zelnova Natural x1Lt.", price: 6300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 316, code: "234", group: null, name: "Cera Líquida Madera Zelnova Roble Claro x1Lt.", price: 8900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 317, code: "235", group: null, name: "Cepillo Uñas", price: 2000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 318, code: "358", group: null, name: "Limpia Vidrios con esponja Extralimp", price: 6200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 319, code: "415", group: null, name: "Limpia Vidrios con esponja Gold Make", price: 7400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 320, code: "253", group: null, name: "Limpia Vidrios con esponja c/cabo Make", price: 8800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 321, code: "257", group: null, name: "Limpia Hornos En frío Aero. Smell Fresh", price: 5700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 322, code: "290", group: null, name: "Limpia Hornos En frío Aero. Max Aroma", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 323, code: "375", group: null, name: "Pilas AA Genérica x4un.", price: 2100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 324, code: "376", group: null, name: "Pilas AAA Genérica x4un.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 325, code: "259", group: null, name: "Pilas AA Duracell x2un.", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 326, code: "260", group: null, name: "Pilas AAA Duracell x2un.", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 327, code: "362", group: null, name: "Velas blancas hornito x 12 unidades", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 328, code: "374", group: null, name: "Velas largas x 4 unidades", price: 2200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 329, code: "207", group: null, name: "Cepillo Lava Autos", price: 4800, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 330, code: "208", group: null, name: "Cepillo Lava Camión", price: 5100, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 331, code: "219", group: null, name: "Cepillo Lava Neumáticos", price: 4800, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 332, code: "408", group: null, name: "Cera Teflon 1 litro", price: 2400, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 333, code: "409", group: null, name: "Cera Teflon 5 litros", price: 9500, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 334, code: "407", group: null, name: "Pad Aplicador silicona", price: 1500, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 335, code: "218", group: null, name: "Esponja Lava Autos", price: 2600, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 336, code: "406", group: null, name: "Guante microfibra limpia autos", price: 7600, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 337, code: "91", group: null, name: "Limpia motor 1 lts.", price: 2000, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 338, code: "92", group: null, name: "Limpia motor 5 lts.", price: 7000, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 339, code: "93", group: null, name: "Limpia tapizado 1 lts.", price: 2000, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 340, code: "94", group: null, name: "Limpia tapizado 5 lts.", price: 7000, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 341, code: "346", group: null, name: "Microfibra lava autos Samantha", price: 8300, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 342, code: "215", group: null, name: "Rejilla Lava Autos", price: 3900, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 343, code: "87", group: null, name: "Shampoo siliconado 1 lts.", price: 3500, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 344, code: "88", group: null, name: "Shampoo siliconado 5 lts.", price: 10900, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 345, code: "304", group: null, name: "Silicona Escudo Aero RG2", price: 6800, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 346, code: "291", group: null, name: "Silicona Exterior 1/2lt.", price: 5900, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 347, code: "89", group: null, name: "Silicona Exterior 1 lt.", price: 10500, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 348, code: "90", group: null, name: "Silicona Exterior 5 lts.", price: 41900, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 349, code: "288", group: null, name: "Acople rápido Vulcano", price: 5900, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 350, code: "285", group: null, name: "Boya hongo chica", price: 2000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 351, code: "280", group: "280-281", name: "Alguicida 1 litro", price: 4000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 352, code: "281", group: "280-281", name: "Alguicida 5 litros", price: 17000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 353, code: "282", group: "282-283", name: "Clarificador 1 litro", price: 4000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 354, code: "283", group: "282-283", name: "Clarificador 5 litros", price: 17000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 355, code: "53", group: "53-54", name: "Cloro Líquido 1 litro", price: 1800, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 356, code: "54", group: "53-54", name: "Cloro Líquido 5 litros", price: 6000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 357, code: "284", group: null, name: "Cloro pastillas Triple Acción x 1/2 kilo", price: 6500, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 358, code: "111", group: null, name: "Cloro pastillas Triple Acción x1kg", price: 9500, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 359, code: "314", group: "314-315", name: "Regulador PH MAK 1 litro", price: 4000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 360, code: "315", group: "314-315", name: "Regulador PH MAK 5 litros", price: 14900, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 361, code: "347", group: null, name: "Saca hojas Vulcano pileta", price: 14900, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 362, code: "312", group: null, name: "Test Kit Cloro y PH", price: 12500, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 363, code: "179", group: null, name: "Carbón 4 kg. Especial Parrillero", price: 5800, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 364, code: "180", group: null, name: "Carbón 8kg. Especial Parrillero", price: 10500, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 365, code: "354", group: null, name: "Carbón 8kg. Especial Parrillero Premium Quebracho", price: 16900, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 366, code: "181", group: null, name: "Leña 10 kg. Aprox.", price: 9000, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 367, code: "183", group: null, name: "Iniciador de fuego Cajita", price: 2500, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 368, code: "182", group: null, name: "Atados Madera", price: 2500, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 369, code: "184", group: null, name: "Iniciador de fuego Pastillas", price: 4500, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 370, code: "175", group: null, name: "Fosforos de madera 222 Patito", price: 2300, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 371, code: "261", group: null, name: "Alcohol de Quemar x1Lt.", price: 5200, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 372, code: "410", group: null, name: "Bolsa Arranque A.D. 15x25", price: 4900, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 373, code: "237", group: null, name: "Bolsa Arranque A.D. 20x25", price: 5300, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 374, code: "334", group: null, name: "Bolsa Arranque A.D. 25x35", price: 9500, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 375, code: "328", group: null, name: "Bolsa Arranque A.D. 40x50", price: 12900, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 376, code: "411", group: null, name: "Bolsa Arranque A.D. 45x60", price: 15900, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 377, code: "265", group: null, name: "Rollo Papel Manteca", price: 2500, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 378, code: "266", group: null, name: "Rollo Papel Aluminio 30 mts.", price: 2600, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 379, code: "373", group: null, name: "Rollo Papel Aluminio 1/2 Kg.", price: 14900, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 380, code: "136", group: null, name: "Rollo Film Ecol 30x30mts.", price: 2600, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 381, code: "333", group: null, name: "Rollo Film 38x100mts", price: 7200, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 382, code: "240", group: null, name: "Rollo Film 38x300mts Alimenticio", price: 10600, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 383, code: "239", group: null, name: "Laminas para Freezer 25x37 1kg.", price: 7200, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 384, code: "241", group: null, name: "Bolsa Camiseta Negra A.D. 45x60 70uds.", price: 3500, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 385, code: "412", group: null, name: "Resma Papel A4 75grs x 500 Hojas", price: 9300, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 386, code: "238", group: null, name: "Vaso Plástico 180cc Blanco x100u", price: 7500, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 387, code: "83", group: null, name: "Alcohol en gel 1 litro", price: 4500, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 388, code: "84", group: null, name: "Alcohol en gel 5 litros", price: 18200, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 389, code: "85", group: null, name: "Alcohol etilico 96° 1 litro", price: 4900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 390, code: "86", group: null, name: "Alcohol etilico 96° 5 litros", price: 18900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 391, code: "359", group: null, name: "Alcohol etilico 70° 1 litro", price: 3900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 392, code: "360", group: null, name: "Alcohol etilico 70° 5 litros", price: 13900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 393, code: "365", group: null, name: "Alcohol Isopropilico 1 litro", price: 12900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 394, code: "366", group: null, name: "Alcohol Isopropilico 5 litros", price: 49900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 395, code: "377", group: null, name: "Alfombra Baño \"BATHROOM\"", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 396, code: "378", group: null, name: "Cesto para Ropa Sucia \"LAUNDRY\"", price: 8700, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 397, code: "379", group: null, name: "Set Destornillador x31 piezas", price: 4200, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 398, code: "380", group: null, name: "Humificador Simil Bamboo", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 399, code: "381", group: null, name: "Secador De Vidrios Con Trapo Limpiador", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 400, code: "382", group: null, name: "Manopla de Silicona Horno", price: 2400, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 401, code: "383", group: null, name: "Guante Quita Pelos Mascotas", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 402, code: "384", group: null, name: "Saca Pelusa Mascotas", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 403, code: "385", group: null, name: "Pastillero Semanal-Mensual", price: 6900, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 404, code: "386", group: null, name: "Dispenser de Detergente con Porta Esponja", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 405, code: "387", group: null, name: "Escurridor de Platos Plegable", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 406, code: "388", group: null, name: "Set Cutter", price: 7400, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 407, code: "389", group: null, name: "Cable HDMI Mallado", price: 6900, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 408, code: "390", group: null, name: "Sopladora + Aspiradora Alta Potencia", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
];

function money(n: number) {
  return n.toLocaleString("es-AR");
}

function PriceTag({ amount, small }: { amount: number; small?: boolean }) {
  return (
    <div
      className="relative inline-flex items-center"
      style={{
        fontFamily: "'Space Mono', monospace",
        background: colors.lime,
        color: colors.white,
        padding: small ? "2px 10px 2px 16px" : "4px 14px 4px 20px",
        borderRadius: "3px",
        fontWeight: 700,
        fontSize: small ? 12 : 14,
        transform: "rotate(-2deg)",
        boxShadow: "1px 2px 0 rgba(9,47,42,0.25)",
        whiteSpace: "nowrap",
      }}
    >
      <span
        className="absolute rounded-full"
        style={{
          left: 5,
          top: "50%",
          transform: "translateY(-50%)",
          width: small ? 5 : 6,
          height: small ? 5 : 6,
          background: colors.bg,
          border: `1px solid rgba(9,47,42,0.35)`,
        }}
      />
      ${money(amount)}
    </div>
  );
}

/* ============================================================
   FOTOS DE PRODUCTOS
   Subí las fotos a la carpeta public/productos/ con el nombre
   del código del producto (ej: código 83 → productos/83.jpg).
   Si el código tiene un asterisco (ej: "39*40") el archivo va
   con guión en su lugar: productos/39-40.jpg
   Si la foto no existe todavía, se muestra el emoji como antes.
   ============================================================ */
const IMAGE_EXTENSIONS = ["jpg", "JPG", "jpeg", "JPEG"];

function ProductImage({
  product,
  className,
  style,
  emojiSize,
}: {
  product: any;
  className?: string;
  style?: React.CSSProperties;
  emojiSize?: number;
}) {
  const [attempt, setAttempt] = useState(0);
  const baseStyle = { background: colors.mint, ...style };

  // Nombres de archivo a probar: primero el código propio (ej: 21.jpg),
  // y si no existe, el código doble original (ej: 21-22.jpg).
  const baseNames = [String(product.code).replace(/\*/g, "-")];
  if (product.group) baseNames.push(String(product.group));

  const candidates: string[] = [];
  baseNames.forEach((base) => {
    IMAGE_EXTENSIONS.forEach((ext) => candidates.push(`/productos/${base}.${ext}`));
  });

  if (attempt >= candidates.length) {
    return (
      <div
        className={`rounded-xl flex items-center justify-center ${className || ""}`}
        style={{ ...baseStyle, fontSize: emojiSize || 32 }}
      >
        {product.emoji}
      </div>
    );
  }

  const src = candidates[attempt];

  return (
    <div className={`rounded-xl overflow-hidden ${className || ""}`} style={baseStyle}>
      <img
        src={src}
        alt={product.name}
        onError={() => setAttempt((a) => a + 1)}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}

export default function LimpiezaApp() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState("lavanderia");
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [step, setStep] = useState(0); // 0 carrito, 1 entrega, 2 pago, 3 contacto, 4 resumen
  const [delivery, setDelivery] = useState<string | null>(null);
  const [address, setAddress] = useState({ calle: "", altura: "", barrio: "", referencia: "" });
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [contact, setContact] = useState({ nombre: "", telefono: "" });
  const [bump, setBump] = useState(false);
  const [aliasCopied, setAliasCopied] = useState(false);
  const firstRender = useRef(true);

  const visibleProducts = products.filter((p) => {
    if (p.category !== activeCategory) return false;
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return p.name.toLowerCase().includes(q) || String(p.code).includes(q);
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartItems = products
    .filter((p) => cart[p.id] > 0)
    .map((p) => ({ ...p, qty: cart[p.id] }));
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.qty, 0);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setBump(true);
    const t = setTimeout(() => setBump(false), 260);
    return () => clearTimeout(t);
  }, [cartCount]);

  function addToCart(id: number) {
    const product = products.find((p) => p.id === id);
    if (!product || product.unavailable) return;
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }
  function removeOne(id: number) {
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return c;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }

  function openCart() {
    setStep(0);
    setSheetOpen(true);
  }
  function closeSheet() {
    setSheetOpen(false);
  }

  function copyAlias() {
    navigator.clipboard.writeText(MP_ALIAS).then(() => {
      setAliasCopied(true);
      setTimeout(() => setAliasCopied(false), 2000);
    });
  }

  const canGoToPayment = delivery === "retiro" || (delivery === "envio" && address.calle && address.altura && timeSlot);
  const canGoToContact = !!payment;
  const canConfirm = contact.nombre.trim() && contact.telefono.trim();

  function buildMessage() {
    const lines = [];
    lines.push(`Hola! Quiero hacer un pedido en ${STORE_NAME}:`);
    lines.push("");
    cartItems.forEach((p) => {
      lines.push(`• Cód. ${p.code} — ${p.name} x${p.qty} — $${money(p.price * p.qty)}`);
    });
    lines.push("");
    lines.push(`Subtotal: $${money(subtotal)}`);
    lines.push("");
    if (delivery === "envio") {
      lines.push(`Entrega: envío a domicilio`);
      lines.push(`Horario preferido: ${timeSlot === "manana" ? "Mañana" : "Tarde"}`);
      lines.push(`Dirección: ${address.calle} ${address.altura}${address.barrio ? ", " + address.barrio : ""}`);
      if (address.referencia) lines.push(`Referencia: ${address.referencia}`);
    } else {
      lines.push(`Entrega: retiro en el local (${STORE_ADDRESS})`);
    }
    lines.push(`Pago: ${payment === "efectivo" ? "efectivo" : "transferencia"}`);
    if (payment === "transferencia") {
      lines.push("Te adjunto comprobante de transferencia");
    }
    lines.push("");
    lines.push(`Nombre: ${contact.nombre}`);
    lines.push(`Teléfono: ${contact.telefono}`);
    return lines.join("\n");
  }

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: colors.bg, fontFamily: "'Work Sans', sans-serif", color: colors.ink }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
        @keyframes bump { 0%{transform:scale(1)} 40%{transform:scale(1.35)} 100%{transform:scale(1)} }
        @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .bump { animation: bump 0.26s ease; }
        .sheet-in { animation: slideUp 0.28s cubic-bezier(.32,.72,0,1); }
        .fade-in { animation: fadeIn 0.2s ease; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HEADER */}
      <header
        className="sticky top-0 z-20 px-5 pt-6 pb-4"
        style={{
          background: `radial-gradient(circle at 12% 20%, rgba(255,255,255,0.10) 0 6px, transparent 7px),
                       radial-gradient(circle at 78% 60%, rgba(255,255,255,0.08) 0 8px, transparent 9px),
                       radial-gradient(circle at 40% 85%, rgba(255,255,255,0.10) 0 5px, transparent 6px),
                       radial-gradient(circle at 92% 15%, rgba(255,255,255,0.08) 0 4px, transparent 5px),
                       ${colors.primary}`,
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div
              className="flex items-center gap-1.5"
              style={{ color: colors.lime }}
            >
              <Sparkles size={16} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1 }}>
                {STORE_HOURS}
              </span>
            </div>
            <h1
              className="mt-1"
              style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 28, color: colors.white }}
            >
              {STORE_NAME}
            </h1>
            <div className="flex items-center gap-1 mt-1" style={{ color: colors.white }}>
              <MapPin size={13} color={colors.lime} />
              <span style={{ fontSize: 12.5 }}>{STORE_ADDRESS}</span>
            </div>
            <p style={{ color: colors.mint, fontSize: 13, marginTop: 4 }}>{STORE_TAGLINE}</p>
          </div>

          <div className="flex flex-col items-center gap-2 shrink-0">
            <button
              onClick={openCart}
              className="relative rounded-full flex items-center justify-center"
              style={{ width: 46, height: 46, background: colors.white, marginTop: 4 }}
              aria-label="Ver carrito"
            >
              <ShoppingCart size={20} color={colors.primary} />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 rounded-full flex items-center justify-center ${bump ? "bump" : ""}`}
                  style={{
                    minWidth: 20,
                    height: 20,
                    padding: "0 5px",
                    background: colors.coral,
                    color: colors.white,
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Tengo una consulta sobre un producto.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full flex items-center justify-center"
              style={{ width: 40, height: 40, background: "#25D366" }}
              aria-label="Consultar por WhatsApp"
            >
              <MessageCircle size={18} color={colors.white} />
            </a>
          </div>
        </div>
      </header>

      {/* CATEGORÍAS */}
      <div className="px-5 py-3 flex gap-2 overflow-x-auto" style={{ background: colors.bg }}>
        {categories.map((c) => {
          const active = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full"
              style={{
                background: active ? colors.primary : colors.white,
                color: active ? colors.white : colors.ink,
                border: `1px solid ${active ? colors.primary : colors.mintDark}`,
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              <span>{c.emoji}</span>
              {c.label}
            </button>
          );
        })}
      </div>

      {/* GRID DE PRODUCTOS */}
      {/* BUSCADOR */}
      <div className="px-5 pb-2">
        <div className="relative">
          <Search size={16} color={colors.gray} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o código..."
            className="w-full rounded-full pl-9 pr-3 py-2.5 text-sm"
            style={{ border: `1px solid ${colors.mintDark}`, background: colors.white }}
          />
        </div>
      </div>

      <main className="flex-1 px-5 pt-2 pb-28 grid grid-cols-2 gap-3">
        {visibleProducts.length === 0 && (
          <div className="col-span-2 flex flex-col items-center text-center py-10">
            <div style={{ fontSize: 36, marginBottom: 6 }}>🔍</div>
            <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 600, fontSize: 14 }}>Sin resultados</p>
            <p style={{ color: colors.gray, fontSize: 12, marginTop: 2 }}>Probá con otro nombre o código.</p>
          </div>
        )}
        {visibleProducts.map((p) => {
          const qty = cart[p.id] || 0;
          return (
            <div
              key={p.id}
              className="rounded-2xl p-3 flex flex-col"
              style={{
                background: colors.white,
                border: `1px solid ${colors.mintDark}`,
                opacity: p.unavailable ? 0.5 : 1,
              }}
            >
              <ProductImage product={p} className="mb-2" style={{ height: 76 }} emojiSize={32} />
              <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 600, fontSize: 14, lineHeight: 1.15 }}>
                {p.name}
              </div>
              <div style={{ color: colors.gray, fontSize: 12, marginTop: 2, marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>
                Cód. {p.code}
              </div>

              <div className="mt-auto flex items-center justify-between gap-2">
                {p.unavailable ? (
                  <span
                    className="rounded-full px-2.5 py-1"
                    style={{ background: colors.mintDark, color: colors.primaryDark, fontSize: 11, fontWeight: 600, fontFamily: "'Baloo 2', sans-serif" }}
                  >
                    Sin stock
                  </span>
                ) : (
                  <PriceTag amount={p.price} small />
                )}
                {p.unavailable ? null : qty === 0 ? (
                  <button
                    onClick={() => addToCart(p.id)}
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{ width: 30, height: 30, background: colors.lime }}
                    aria-label={`Agregar ${p.name}`}
                  >
                    <Plus size={16} color={colors.white} />
                  </button>
                ) : (
                  <div
                    className="flex items-center rounded-full shrink-0"
                    style={{ background: colors.primary }}
                  >
                    <button onClick={() => removeOne(p.id)} className="flex items-center justify-center" style={{ width: 26, height: 26 }} aria-label="Restar">
                      <Minus size={13} color={colors.white} />
                    </button>
                    <span style={{ color: colors.white, fontSize: 12, fontFamily: "'Space Mono', monospace", minWidth: 14, textAlign: "center" }}>
                      {qty}
                    </span>
                    <button onClick={() => addToCart(p.id)} className="flex items-center justify-center" style={{ width: 26, height: 26 }} aria-label="Sumar">
                      <Plus size={13} color={colors.white} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </main>

      {/* BARRA INFERIOR FIJA */}
      {cartCount > 0 && !sheetOpen && (
        <button
          onClick={openCart}
          className="fixed bottom-4 left-4 right-4 rounded-2xl flex items-center justify-between px-5 py-4 fade-in"
          style={{ background: colors.primary, boxShadow: "0 8px 24px rgba(9,47,42,0.35)", maxWidth: 480, margin: "0 auto" }}
        >
          <span style={{ color: colors.white, fontFamily: "'Baloo 2', sans-serif", fontWeight: 600, fontSize: 14 }}>
            Ver carrito · {cartCount} {cartCount === 1 ? "producto" : "productos"}
          </span>
          <PriceTag amount={subtotal} />
        </button>
      )}

      {/* SHEET: CARRITO / CHECKOUT */}
      {sheetOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-center" style={{ background: "rgba(9,47,42,0.45)" }}>
          <div
            className="sheet-in w-full flex flex-col"
            style={{
              maxWidth: 480,
              maxHeight: "88vh",
              background: colors.bg,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              overflow: "hidden",
            }}
          >
            {/* header del sheet */}
            <div className="flex items-center justify-between px-5 py-4" style={{ background: colors.white, borderBottom: `1px solid ${colors.mintDark}` }}>
              <div className="flex items-center gap-2">
                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} aria-label="Volver">
                    <ChevronLeft size={22} color={colors.ink} />
                  </button>
                )}
                <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 17 }}>
                  {step === 0 && "Tu carrito"}
                  {step === 1 && "¿Cómo lo recibís?"}
                  {step === 2 && "¿Cómo pagás?"}
                  {step === 3 && "Tus datos"}
                  {step === 4 && "Confirmá tu pedido"}
                </span>
              </div>
              <button onClick={closeSheet} aria-label="Cerrar">
                <X size={20} color={colors.gray} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {/* PASO 0: CARRITO */}
              {step === 0 && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center text-center py-10">
                      <div style={{ fontSize: 40, marginBottom: 8 }}>🧺</div>
                      <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 600, fontSize: 15 }}>
                        Todavía no agregaste nada
                      </p>
                      <p style={{ color: colors.gray, fontSize: 13, marginTop: 4 }}>
                        Elegí productos de la lista y los vas a ver acá.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {cartItems.map((p) => (
                        <div key={p.id} className="flex items-center gap-3">
                          <ProductImage product={p} className="shrink-0" style={{ width: 48, height: 48 }} emojiSize={22} />
                          <div className="flex-1 min-w-0">
                            <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                            <div style={{ color: colors.gray, fontSize: 12, fontFamily: "'Space Mono', monospace" }}>Cód. {p.code}</div>
                          </div>
                          <div className="flex items-center rounded-full" style={{ background: colors.white, border: `1px solid ${colors.mintDark}` }}>
                            <button onClick={() => removeOne(p.id)} className="flex items-center justify-center" style={{ width: 26, height: 26 }}>
                              <Minus size={13} color={colors.ink} />
                            </button>
                            <span style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", minWidth: 14, textAlign: "center" }}>{p.qty}</span>
                            <button onClick={() => addToCart(p.id)} className="flex items-center justify-center" style={{ width: 26, height: 26 }}>
                              <Plus size={13} color={colors.ink} />
                            </button>
                          </div>
                          <PriceTag amount={p.price * p.qty} small />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* PASO 1: ENTREGA */}
              {step === 1 && (
                <div className="flex flex-col gap-3">
                  {[
                    { id: "envio", label: "Envío a domicilio", desc: "Coordinamos el costo por WhatsApp", icon: Truck },
                    { id: "retiro", label: "Retiro en el local", desc: STORE_ADDRESS, icon: Store },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const active = delivery === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setDelivery(opt.id)}
                        className="flex items-center gap-3 p-4 rounded-2xl text-left"
                        style={{ background: active ? colors.primary : colors.white, border: `1px solid ${active ? colors.primary : colors.mintDark}` }}
                      >
                        <Icon size={22} color={active ? colors.lime : colors.primary} />
                        <div>
                          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 600, fontSize: 14, color: active ? colors.white : colors.ink }}>
                            {opt.label}
                          </div>
                          <div style={{ fontSize: 12, color: active ? colors.mint : colors.gray }}>{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}

                  {delivery === "envio" && (
                    <div className="flex flex-col gap-2 mt-1 fade-in">
                      <div>
                        <div className="flex items-center gap-1.5 mb-2" style={{ color: colors.gray, fontSize: 12.5 }}>
                          <Clock size={14} />
                          ¿En qué horario preferís recibirlo?
                        </div>
                        <div className="flex gap-2">
                          {[
                            { id: "manana", label: "Mañana" },
                            { id: "tarde", label: "Tarde" },
                          ].map((slot) => {
                            const active = timeSlot === slot.id;
                            return (
                              <button
                                key={slot.id}
                                onClick={() => setTimeSlot(slot.id)}
                                className="flex-1 rounded-xl py-2.5 text-center"
                                style={{
                                  background: active ? colors.primary : colors.white,
                                  color: active ? colors.white : colors.ink,
                                  border: `1px solid ${active ? colors.primary : colors.mintDark}`,
                                  fontFamily: "'Baloo 2', sans-serif",
                                  fontWeight: 600,
                                  fontSize: 13,
                                }}
                              >
                                {slot.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <input
                          placeholder="Calle"
                          value={address.calle}
                          onChange={(e) => setAddress({ ...address, calle: e.target.value })}
                          className="flex-1 rounded-xl px-3 py-2.5 text-sm"
                          style={{ border: `1px solid ${colors.mintDark}`, background: colors.white }}
                        />
                        <input
                          placeholder="Altura"
                          value={address.altura}
                          onChange={(e) => setAddress({ ...address, altura: e.target.value })}
                          className="rounded-xl px-3 py-2.5 text-sm"
                          style={{ width: 90, border: `1px solid ${colors.mintDark}`, background: colors.white }}
                        />
                      </div>
                      <input
                        placeholder="Barrio (opcional)"
                        value={address.barrio}
                        onChange={(e) => setAddress({ ...address, barrio: e.target.value })}
                        className="rounded-xl px-3 py-2.5 text-sm"
                        style={{ border: `1px solid ${colors.mintDark}`, background: colors.white }}
                      />
                      <input
                        placeholder="Referencia (opcional)"
                        value={address.referencia}
                        onChange={(e) => setAddress({ ...address, referencia: e.target.value })}
                        className="rounded-xl px-3 py-2.5 text-sm"
                        style={{ border: `1px solid ${colors.mintDark}`, background: colors.white }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* PASO 2: PAGO */}
              {step === 2 && (
                <div className="flex flex-col gap-3">
                  {[
                    { id: "efectivo", label: "Efectivo", desc: "Pagás al recibir o al retirar", icon: Banknote },
                    { id: "transferencia", label: "Transferencia", desc: "Te pasamos los datos al confirmar", icon: Landmark },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const active = payment === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setPayment(opt.id)}
                        className="flex items-center gap-3 p-4 rounded-2xl text-left"
                        style={{ background: active ? colors.primary : colors.white, border: `1px solid ${active ? colors.primary : colors.mintDark}` }}
                      >
                        <Icon size={22} color={active ? colors.lime : colors.primary} />
                        <div>
                          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 600, fontSize: 14, color: active ? colors.white : colors.ink }}>
                            {opt.label}
                          </div>
                          <div style={{ fontSize: 12, color: active ? colors.mint : colors.gray }}>{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}

                  {payment === "transferencia" && (
                    <div className="rounded-2xl p-4 fade-in" style={{ background: colors.mint, border: `1px solid ${colors.mintDark}` }}>
                      <div style={{ fontSize: 12, color: colors.primaryDark, marginBottom: 8 }}>
                        Transferí a este alias de Mercado Pago:
                      </div>
                      <button
                        onClick={copyAlias}
                        className="w-full flex items-center justify-between rounded-xl px-4 py-3"
                        style={{ background: colors.white, border: `1px solid ${colors.mintDark}` }}
                      >
                        <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16, color: colors.primaryDark }}>
                          {MP_ALIAS}
                        </span>
                        <span className="flex items-center gap-1" style={{ fontSize: 12, color: colors.primary, fontWeight: 600 }}>
                          <Copy size={14} />
                          {aliasCopied ? "¡Copiado!" : "Copiar"}
                        </span>
                      </button>
                      <div className="flex items-start gap-1.5 mt-3" style={{ fontSize: 12, color: colors.primaryDark }}>
                        <MessageCircle size={14} style={{ marginTop: 1, flexShrink: 0 }} />
                        <span>Después de transferir, mandanos el comprobante por WhatsApp para confirmar el pedido.</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PASO 3: CONTACTO */}
              {step === 3 && (
                <div className="flex flex-col gap-2">
                  <input
                    placeholder="Nombre y apellido"
                    value={contact.nombre}
                    onChange={(e) => setContact({ ...contact, nombre: e.target.value })}
                    className="rounded-xl px-3 py-2.5 text-sm"
                    style={{ border: `1px solid ${colors.mintDark}`, background: colors.white }}
                  />
                  <input
                    placeholder="Teléfono"
                    value={contact.telefono}
                    onChange={(e) => setContact({ ...contact, telefono: e.target.value })}
                    className="rounded-xl px-3 py-2.5 text-sm"
                    style={{ border: `1px solid ${colors.mintDark}`, background: colors.white }}
                  />
                </div>
              )}

              {/* PASO 4: RESUMEN */}
              {step === 4 && (
                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl p-4" style={{ background: colors.white, border: `1px solid ${colors.mintDark}` }}>
                    {cartItems.map((p) => (
                      <div key={p.id} className="flex justify-between text-sm py-1">
                        <span>{p.name} x{p.qty}</span>
                        <span style={{ fontFamily: "'Space Mono', monospace" }}>${money(p.price * p.qty)}</span>
                      </div>
                    ))}
                    <div className="h-px my-2" style={{ background: colors.mintDark }} />
                    <div className="flex justify-between text-sm">
                      <span>Entrega</span>
                      <span>{delivery === "envio" ? "Envío a domicilio" : "Retiro en el local"}</span>
                    </div>
                    {delivery === "envio" && (
                      <div className="flex justify-between text-sm">
                        <span>Horario</span>
                        <span>{timeSlot === "manana" ? "Mañana" : "Tarde"}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Pago</span>
                      <span>{payment === "efectivo" ? "Efectivo" : "Transferencia"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: colors.mint }}>
                    <Check size={16} color={colors.primary} />
                    <span style={{ fontSize: 12, color: colors.primaryDark }}>
                      Al confirmar se abre WhatsApp con el pedido listo para enviar.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* FOOTER DEL SHEET */}
            <div className="px-5 py-4" style={{ background: colors.white, borderTop: `1px solid ${colors.mintDark}` }}>
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: 13, color: colors.gray }}>Subtotal</span>
                <PriceTag amount={subtotal} />
              </div>

              {step === 0 && (
                <button
                  disabled={cartItems.length === 0}
                  onClick={() => setStep(1)}
                  className="w-full rounded-full py-3 flex items-center justify-center gap-2"
                  style={{
                    background: cartItems.length === 0 ? colors.mintDark : colors.primary,
                    color: colors.white,
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Elegir entrega
                </button>
              )}
              {step === 1 && (
                <button
                  disabled={!canGoToPayment}
                  onClick={() => setStep(2)}
                  className="w-full rounded-full py-3"
                  style={{
                    background: canGoToPayment ? colors.primary : colors.mintDark,
                    color: colors.white,
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Elegir pago
                </button>
              )}
              {step === 2 && (
                <button
                  disabled={!canGoToContact}
                  onClick={() => setStep(3)}
                  className="w-full rounded-full py-3"
                  style={{
                    background: canGoToContact ? colors.primary : colors.mintDark,
                    color: colors.white,
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Continuar
                </button>
              )}
              {step === 3 && (
                <button
                  disabled={!canConfirm}
                  onClick={() => setStep(4)}
                  className="w-full rounded-full py-3"
                  style={{
                    background: canConfirm ? colors.primary : colors.mintDark,
                    color: colors.white,
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Revisar pedido
                </button>
              )}
              {step === 4 && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full py-3 flex items-center justify-center gap-2"
                  style={{ background: "#25D366", color: colors.white, fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 14 }}
                >
                  <MessageCircle size={17} />
                  Confirmar pedido por WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
