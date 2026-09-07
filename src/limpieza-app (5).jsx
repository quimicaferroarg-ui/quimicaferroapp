import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Plus, Minus, X, Truck, Store, Banknote,
  Landmark, ChevronLeft, Check, MessageCircle, Sparkles, Search, Clock
} from "lucide-react";

/* ============================================================
   CONFIGURACIÓN DEL LOCAL — para editar según el negocio real
   ============================================================ */
const STORE_NAME = "Química Ferro";
const STORE_TAGLINE = "Limpieza, bazar y artículos para el hogar";
const WHATSAPP_NUMBER = "5491154647972"; // del catálogo: 11 5464-7972 — revisar que sea el numero correcto de WhatsApp
const STORE_ADDRESS = "Altolaguirre 1427/29, C.A.B.A.";
const STORE_HOURS = "Lun a vie de 16 a 20 hs · Sáb de 10 a 13 hs";

const colors = {
  bg: "#F6FBFA",
  primary: "#0D5C52",
  primaryDark: "#092F2A",
  lime: "#D8EC3A",
  mint: "#E3F3EE",
  mintDark: "#C7E6DD",
  ink: "#10201D",
  coral: "#FF6B4A",
  white: "#FFFFFF",
  gray: "#6B7A76",
};

const categories = [
  { id: "limpiadores", label: "Limpiadores", emoji: "🧽" }, // 24 productos
  { id: "detergentes", label: "Detergentes", emoji: "🧴" }, // 4 productos
  { id: "lavanderia", label: "Lavandería", emoji: "👕" }, // 16 productos
  { id: "pisos", label: "Pisos", emoji: "🪣" }, // 6 productos
  { id: "alcohol", label: "Alcohol", emoji: "🧪" }, // 8 productos
  { id: "papel", label: "Papel", emoji: "🧻" }, // 20 productos
  { id: "piscina", label: "Piscina", emoji: "🏊" }, // 10 productos
  { id: "fuego", label: "Fuego", emoji: "🔥" }, // 9 productos
  { id: "bazar", label: "Bazar", emoji: "🏠" }, // 225 productos
  { id: "bazar-especial", label: "Bazar especial", emoji: "✨" }, // 14 productos
  { id: "cosmetica-automotor", label: "Cosmética automotor", emoji: "🚗" }, // 20 productos
  { id: "papeleria", label: "Papelería", emoji: "✏️" }, // 15 productos
];

const products = [
  { id: 1, code: 83, name: "Alcohol en gel 1 litro", price: 4500, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 2, code: 84, name: "Alcohol en gel 5 litros", price: 18200, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 3, code: 85, name: "Alcohol etilico 96° 1 litro", price: 4900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 4, code: 86, name: "Alcohol etilico 96° 5 litros", price: 18900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 5, code: 359, name: "Alcohol etilico 70° 1 litro", price: 3900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 6, code: 360, name: "Alcohol etilico 70° 5 litros", price: 13900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 7, code: 365, name: "Alcohol Isopropilico 1 litro", price: 12900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 8, code: 366, name: "Alcohol Isopropilico 5 litros", price: 49900, category: "alcohol", emoji: "🧪", unavailable: false },
  { id: 9, code: 124, name: "Antihumedad escamas 1/2 kg.", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 10, code: 125, name: "Bicarbonato de sodio 1/2 kilo", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 11, code: 423, name: "Borax 200gs", price: 2300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 12, code: 126, name: "Percarbonato de Sodio 1/4 Kilo (Blanqueador)", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 13, code: 127, name: "Percarbonato de Sodio 1 Kilo (Blanqueador)", price: 11500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 14, code: 204, name: "Ácido Cítrico 200 gr. (Eliminador de sarro)", price: 2700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 15, code: 431, name: "Desinfectante Amonio 1Litro", price: 2400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 16, code: 432, name: "Desinfectante Amonio 5Litros", price: 7500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 17, code: 305, name: "Aromatizante Ambiente Aero Smell Fresh Frag.varias", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 18, code: 316, name: "Aparato aromatizantes", price: 10500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 19, code: 213, name: "Algodón Baby Precortado 100gr", price: 2500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 20, code: 214, name: "Algodón Baby Paños 40 unidades", price: 3800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 21, code: 343, name: "Antorchitas p/prender Horno", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 22, code: 427, name: "Antihumedad Air Pur 2 x 250gs", price: 14900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 23, code: 394, name: "Antihumedad frag.varias repuesto", price: 6300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 24, code: 113, name: "Balde 10 lts. Mr. trapo", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 25, code: 195, name: "Balde 9 lts. Colores", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 26, code: 351, name: "Balde traslucido 10 lts.", price: 5400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 27, code: 112, name: "Balde 10 lts. Florida", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 28, code: 152, name: "Balde 12 litros Florida", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 29, code: 255, name: "Balde 13lts. c/manija metálica", price: 6400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 30, code: 256, name: "Combo Balde + Escurridor 13lts.", price: 10500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 31, code: 392, name: "Barrehojas", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 32, code: 55, name: "Bolsas residuos negras 45x60 x 10 unidades", price: 700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 33, code: 56, name: "Bolsas residuos negras 50x70 x 10 unidades", price: 1100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 34, code: 57, name: "Bolsas residuos negras 60x90 x 10 unidades", price: 1600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 35, code: 58, name: "Bolsas residuos negras 70x100 x 10 unidades", price: 2100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 36, code: 59, name: "Bolsas residuos negras 80x110 x 10 unidades", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 37, code: 60, name: "Bolsas residuos negras 90x120 x 10 unidades", price: 3800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 38, code: 144, name: "Bolsas residuos verdes 80x110 x 10 unidades", price: 4300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 39, code: 169, name: "Bolsas residuos verdes 80x110 x 50 unidades", price: 20000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 40, code: 107, name: "Broches para ropa x 12 unidades", price: 1800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 41, code: 158, name: "Cabo Barrendero", price: 4400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 42, code: 120, name: "Cabo Madera 1,30 mts.", price: 1900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 43, code: 335, name: "Cabo Madera 1,20 mts. Premium", price: 2200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 44, code: 121, name: "Cabo Madera 1,50 mts.", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 45, code: 258, name: "Cabo Madera 1,80 mts.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 46, code: 398, name: "Cabo Madera 2 mts.", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 47, code: 336, name: "Cabo Madera forrado 1,20 mts.", price: 2600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 48, code: 72, name: "Cabo Metálico 1,20 mts.", price: 2700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 49, code: 164, name: "Cabo Metálico Virulana", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 50, code: 110, name: "Cepillo mutiuso con mango Extralimp", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 51, code: 119, name: "Cepillo Planchita", price: 3200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 52, code: 352, name: "Cepillo Limpia Mamaderas / Vasos", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 53, code: 349, name: "Cepillo Piso vinilico esp.", price: 3600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 54, code: 395, name: "Quita pelusas Make", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 55, code: 370, name: "Set baño cortina-ganchos-alf.microfibra", price: 16900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 56, code: 337, name: "Cortina p/Ducha 1,80x1,80 vinilica", price: 9000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 57, code: 396, name: "Cuñas traba puertas", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 58, code: 338, name: "Protector cortina baño", price: 5800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 59, code: 339, name: "Ganchos plast.cortina baño", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 60, code: 424, name: "Desinfectante ambientes Smell Fresh Fraqgancias varias", price: 4100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 61, code: 103, name: "Desodorante Glade Aero. 360 CC", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 62, code: 171, name: "Desodorante Lysoform Aero.", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 63, code: 267, name: "Difusor con Varillas Ferro", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 64, code: 425, name: "Dispenser jabon liquido", price: 5400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 65, code: 420, name: "Encendedor clasico a gas", price: 700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 66, code: 224, name: "Embudo Chico", price: 2100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 67, code: 292, name: "Embudo Grande", price: 3600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 68, code: 223, name: "Escencia para Hornillo Fragancias", price: 3200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 69, code: 340, name: "Escoba super Samantha", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 70, code: 341, name: "Escoba con aletas", price: 3400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 71, code: 163, name: "Escoba grande de paja 6 hilos", price: 12500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 72, code: 115, name: "Escobilla de Baño Inodoro", price: 4100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 73, code: 186, name: "Escobillón + Cabo Armado", price: 5800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 74, code: 157, name: "Escobillón Cepillo Barrendero chico", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 75, code: 156, name: "Escobillón Cepillo Barrendero grande", price: 11700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 76, code: 203, name: "Escobillón Recto", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 77, code: 308, name: "Escobillón Recto Bicolor medio", price: 3400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 78, code: 303, name: "Escobillón Recto Laqueado", price: 5600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 79, code: 73, name: "Escobillón Curvo", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 80, code: 246, name: "Escurridor para Balde 13lts.", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 81, code: 65, name: "Esponja de Acero 30 gr.", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 82, code: 75, name: "Esponja Lavavajillas económica", price: 900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 83, code: 63, name: "Esponja Lavavajillas Intermedia con salva uñas", price: 1300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 84, code: 64, name: "Esponja Lavavajillas XXL Premium", price: 1600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 85, code: 330, name: "Esponja Spugnella Antiadherente", price: 2100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 86, code: 66, name: "Estropajo de Acero profesional", price: 1700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 87, code: 68, name: "Franela Naranja 50x40", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 88, code: 321, name: "Fuenton 14lts Florida", price: 5700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 89, code: 155, name: "Fuenton 16lts Florida", price: 6900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 90, code: 320, name: "Fuenton 17lts traslúcido", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 91, code: 216, name: "Fuenton 20lts", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 92, code: 297, name: "Fuenton 28lts", price: 10400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 93, code: 322, name: "Fuenton 35lts", price: 12900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 94, code: 150, name: "Guantes Moteados talle único", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 95, code: 139, name: "Guantes Afelpado Denario \"L\"", price: 2400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 96, code: 71, name: "Guante Afelpado Make \"S-M\"", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 97, code: 400, name: "Guante 1/2 Naranja promax", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 98, code: 399, name: "Guante 1/2 Naranja eternal", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 99, code: 293, name: "Guante Afelpado Mapa \"S-M-L\"", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 100, code: 363, name: "Guantes Nitrilo descartables Grande x 100", price: 10500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 101, code: 307, name: "Hormiguicida cebo granulado verde", price: 2900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 102, code: 174, name: "Hormiguicida Granulado 200 gs", price: 7400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 103, code: 173, name: "Hormiguicida Polvo", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 104, code: 371, name: "Insecticida Cucarachicida Cebo", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 105, code: 212, name: "Insecticida Cucarachicida Jeringa", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 106, code: 426, name: "Insecticida Escudo Aero Hogar y jardin", price: 6200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 107, code: 99, name: "Insecticida Escudo Aero Mata Cucarachas y Hormigas", price: 4400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 108, code: 100, name: "Insecticida Escudo Aero Mata Moscas y Mosquitos", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 109, code: 101, name: "Insecticida Escudo Aero Mata Moscas y Mosquitos Sin Olor", price: 4400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 110, code: 262, name: "Insecticida Escudo Aero Mata Polillas y Larvas", price: 5500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 111, code: 298, name: "Insecticida Escudo Aero Pulgas y Garrapatas", price: 5500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 112, code: 299, name: "Insecticida Escudo Aero jejenes etc.", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 113, code: 176, name: "Insecticida Espiral Raid 12ud. Lavanda", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 114, code: 98, name: "Insecticida Espirales Mat Iris x 12ud.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 115, code: 141, name: "Insecticida Espirales Raid x 4ud.", price: 1300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 116, code: 128, name: "Insecticida Jeringa Geltek hormigas", price: 5400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 117, code: 222, name: "Insecticida K-Otrina sobre p/diluir", price: 3100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 118, code: 142, name: "Insecticida OFF family 170 cc", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 119, code: 324, name: "Insecticida Raid Aero Cucarachas 360cc", price: 6600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 120, code: 325, name: "Insecticida Raid Aero Moscas y Mosquitos 360 cc", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 121, code: 140, name: "Insecticida Raid Aero Moscas y Mosquitos 360 cc Sin Olor", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 122, code: 132, name: "Insecticida Raid Tabletas x 12ud.", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 123, code: 199, name: "Insecticida Raid Tabletas x 24ud.", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 124, code: 404, name: "Jabon de tocador Nivea 125gr.", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 125, code: 405, name: "Jabon de tocador Lux 120gr.", price: 1900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 126, code: 416, name: "Jabon de tocador Lux 120gr. X 3 uni.", price: 4800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 127, code: 417, name: "Jabon de tocador Rexona 125gr.", price: 1200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 128, code: 418, name: "Jabon de tocador Dove 90gr.", price: 2400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 129, code: 117, name: "Jabón en Pan 150gr.", price: 1200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 130, code: 194, name: "Jabón en Pan Argentino 200gr.", price: 1600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 131, code: 108, name: "Jabón en Pan Seiseme 300gr.", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 132, code: 70, name: "Lana de Acero XXL 60gr.", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 133, code: 69, name: "Lana de Acero rollitos x 10ud.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 134, code: 254, name: "Rollito Virulana x10ud.", price: 2900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 135, code: 421, name: "Lampara candela 9W calida unidad", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 136, code: 422, name: "Lampara candela 10W fria unidad", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 137, code: 198, name: "Limpiatecho Globo", price: 3700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 138, code: 134, name: "Limpiatecho multiuso Samantha", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 139, code: 172, name: "Lubricante RG2 Escudo", price: 6900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 140, code: 205, name: "Lustra Muebles Blem 360cc", price: 6100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 141, code: 244, name: "Lampazo/Mopa Royco Algodón 180gr.", price: 3100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 142, code: 269, name: "Lampazo/Mopa Royco Algodón 280gr.", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 143, code: 429, name: "Lampazo Tiras Amarillas", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 144, code: 342, name: "Mopa Algodón Mr.Trapo", price: 5200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 145, code: 245, name: "Mopa Microfibra Mr.Trapo", price: 4800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 146, code: 323, name: "Mopa Centrífuga", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 147, code: 414, name: "Esponja abrasiva verde x1", price: 1000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 148, code: 306, name: "Paño fibra verde abrasiva x 2 unidades", price: 1700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 149, code: 357, name: "Paño fibra negra abrasiva grueso x 1 unidad", price: 1700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 150, code: 106, name: "Pala con Cabo Común", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 151, code: 131, name: "Pala con Cabo Premiun", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 152, code: 105, name: "Pala con Cabo y Goma", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 153, code: 114, name: "Pala plástica común", price: 1500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 154, code: 318, name: "Palangana 4lts.", price: 2800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 155, code: 319, name: "Palangana 6lts.", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 156, code: 123, name: "Palangana 9lts.", price: 5300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 157, code: 122, name: "Paño Amarillo Piso 50x60", price: 3200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 158, code: 67, name: "Paño Amarillo tipo Ballerina", price: 800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 159, code: 177, name: "Paño Microfibra 40x60", price: 5600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 160, code: 221, name: "Pastillas para Mingitorio", price: 29000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 161, code: 202, name: "Pato bloque adhesivo x3ud.", price: 4200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 162, code: 201, name: "Pato Pastilla para Mochila 40 Gs.", price: 4600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 163, code: 353, name: "Pato Pastilla Inodoro", price: 2400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 164, code: 109, name: "Desodorante Canasta Sólida Glade", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 165, code: 263, name: "Desodorante Canasta Sólida Glade Repuesto", price: 1900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 166, code: 350, name: "Desodorante Glade Toque frag.", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 167, code: 397, name: "Plumero cola de gato", price: 7900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 168, code: 220, name: "Plumero Microfibra", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 169, code: 309, name: "Gatillo Individual", price: 900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 170, code: 317, name: "Pulverizador Gatillo 200 ml", price: 1400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 171, code: 143, name: "Pulverizador Gatillo 500 ml", price: 1700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 172, code: 97, name: "Pulverizador Make 750 Ml. Con gatillo", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 173, code: 418, name: "Pulverizador Make 1000 Ml. Con gatillo", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 174, code: 329, name: "Pulverizador Profesional 1 litro Con gatillo", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 175, code: 211, name: "Raticida Bloques x 9ud.", price: 9000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 176, code: 345, name: "Repasador Microfibra 37x60 1/2 Naranja", price: 4100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 177, code: 393, name: "Repasador Premium", price: 3500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 178, code: 344, name: "Repasador toalla estampado 40x60 cm", price: 3300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 179, code: 268, name: "Repasador Guarda Francesa 50x55 cm", price: 2900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 180, code: 133, name: "Sahumerios Varias Fragancias x 10ud. Triple Empaste", price: 1800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 181, code: 135, name: "Secador Negro Goma corto 26cm", price: 2700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 182, code: 289, name: "Secador Doble Goma calidad Premium 35cm", price: 3400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 183, code: 74, name: "Secador Doble Goma calidad Premium 41cm", price: 3600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 184, code: 167, name: "Secador Doble Goma Samantha 43cm.", price: 4900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 185, code: 242, name: "Secador Aquarapid 30cm", price: 5600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 186, code: 243, name: "Secador Aquarapid 40cm", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 187, code: 185, name: "Secador Economico Armado", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 188, code: 193, name: "Secador Negro Genérico corto", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 189, code: 295, name: "Secador Secarapid Virulana x30cm", price: 5300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 190, code: 197, name: "Secador Secarapid Virulana x40cm", price: 6300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 191, code: 302, name: "Secador Vidrios 24 cm una pieza", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 192, code: 196, name: "Secador Vidrios 20 cm. Virulana", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 193, code: 402, name: "Secador de vidrios Laffitte 20cm", price: 3800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 194, code: 361, name: "Secador Vidrios con Cabo y Esp. Samantha", price: 6800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 195, code: 332, name: "Sopapita Flopy", price: 4300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 196, code: 118, name: "Sopapa Negra Make", price: 3200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 197, code: 151, name: "Sopapa Negra con cabo", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 198, code: 413, name: "Sopapon con cabo largo", price: 6500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 199, code: 391, name: "Trampera Ratas", price: 4000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 200, code: 61, name: "Trapo de piso gris costurado", price: 2000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 201, code: 62, name: "Trapo de piso rayado premiun", price: 3000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 202, code: 217, name: "Trapo de piso consorcio Maxi", price: 3800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 203, code: 153, name: "Trapo rejilla pabilo calado (Panal de abejas)", price: 1400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 204, code: 154, name: "Trapo rejilla cerrada", price: 1600, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 205, code: "209*210", name: "Vinagre Limpieza al 10% (NO COMESTIBLE)", price: 10900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 206, code: 348, name: "Cesto residuos vaiven 6lts.", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 207, code: 313, name: "Cesto Residuos Pedal 13 Lts.", price: 17000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 208, code: 403, name: "Cesto residuos 70 litros c/ Tapa", price: 35900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 209, code: 227, name: "Cesto c/tapa 34LTS.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 210, code: 310, name: "Cera Suiza Liq. Mad. Roble Claro 850cc", price: 9900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 211, code: 311, name: "Cera Suiza Past.Roble Claro 450cc", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 212, code: 274, name: "Cera Ferro Pisos Madera y Mosaicos 1 Lt.", price: 4500, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 213, code: 430, name: "Cera Incolora Ceramica y Marmol", price: 3400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 214, code: 228, name: "Cera Suiza Pisos Plast. y Flot. 850cc", price: 9300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 215, code: 232, name: "Pasa Cera Make", price: 3700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 216, code: 229, name: "Pasa Cera Samantha", price: 6900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 217, code: 230, name: "Vinagre de Alcohol X1lt.", price: 1900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 218, code: 300, name: "Vinagre de Alcohol X5lt.", price: 5900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 219, code: 231, name: "Repuesto Limp. Multisuperficies Cif x400ml", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 220, code: 233, name: "Cera Líquida Madera Zelnova Natural x1Lt.", price: 6300, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 221, code: 234, name: "Cera Líquida Madera Zelnova Roble Claro x1Lt.", price: 8900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 222, code: 235, name: "Cepillo Uñas", price: 2000, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 223, code: 358, name: "Limpia Vidrios con esponja Extralimp", price: 6200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 224, code: 415, name: "Limpia Vidrios con esponja Gold Make", price: 7400, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 225, code: 253, name: "Limpia Vidrios con esponja c/cabo Make", price: 8800, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 226, code: 257, name: "Limpia Hornos En frío Aero. Smell Fresh", price: 5700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 227, code: 290, name: "Limpia Hornos En frío Aero. Max Aroma", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 228, code: 375, name: "Pilas AA Genérica x4un.", price: 2100, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 229, code: 376, name: "Pilas AAA Genérica x4un.", price: 0, category: "bazar", emoji: "🏠", unavailable: true },
  { id: 230, code: 259, name: "Pilas AA Duracell x2un.", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 231, code: 260, name: "Pilas AAA Duracell x2un.", price: 4700, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 232, code: 362, name: "Velas blancas hornito x 12 unidades", price: 3900, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 233, code: 374, name: "Velas largas x 4 unidades", price: 2200, category: "bazar", emoji: "🏠", unavailable: false },
  { id: 234, code: 377, name: "Alfombra Baño \"BATHROOM\"", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 235, code: 378, name: "Cesto para Ropa Sucia \"LAUNDRY\"", price: 8700, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 236, code: 379, name: "Set Destornillador x31 piezas", price: 4200, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 237, code: 380, name: "Humificador Simil Bamboo", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 238, code: 381, name: "Secador De Vidrios Con Trapo Limpiador", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 239, code: 382, name: "Manopla de Silicona Horno", price: 2400, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 240, code: 383, name: "Guante Quita Pelos Mascotas", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 241, code: 384, name: "Saca Pelusa Mascotas", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 242, code: 385, name: "Pastillero Semanal-Mensual", price: 6900, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 243, code: 386, name: "Dispenser de Detergente con Porta Esponja", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 244, code: 387, name: "Escurridor de Platos Plegable", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 245, code: 388, name: "Set Cutter", price: 7400, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 246, code: 389, name: "Cable HDMI Mallado", price: 6900, category: "bazar-especial", emoji: "✨", unavailable: false },
  { id: 247, code: 390, name: "Sopladora + Aspiradora Alta Potencia", price: 0, category: "bazar-especial", emoji: "✨", unavailable: true },
  { id: 248, code: 207, name: "Cepillo Lava Autos", price: 4800, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 249, code: 208, name: "Cepillo Lava Camión", price: 5100, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 250, code: 219, name: "Cepillo Lava Neumáticos", price: 4800, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 251, code: 408, name: "Cera Teflon 1 litro", price: 2400, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 252, code: 409, name: "Cera Teflon 5 litros", price: 9500, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 253, code: 407, name: "Pad Aplicador silicona", price: 1500, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 254, code: 218, name: "Esponja Lava Autos", price: 2600, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 255, code: 406, name: "Guante microfibra limpia autos", price: 7600, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 256, code: 91, name: "Limpia motor 1 lts.", price: 2000, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 257, code: 92, name: "Limpia motor 5 lts.", price: 7000, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 258, code: 93, name: "Limpia tapizado 1 lts.", price: 2000, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 259, code: 94, name: "Limpia tapizado 5 lts.", price: 7000, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 260, code: 346, name: "Microfibra lava autos Samantha", price: 8300, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 261, code: 215, name: "Rejilla Lava Autos", price: 3900, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 262, code: 87, name: "Shampoo siliconado 1 lts.", price: 3500, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 263, code: 88, name: "Shampoo siliconado 5 lts.", price: 10900, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 264, code: 304, name: "Silicona Escudo Aero RG2", price: 6800, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 265, code: 291, name: "Silicona Exterior 1/2lt.", price: 5900, category: "cosmetica-automotor", emoji: "🚗", unavailable: false },
  { id: 266, code: 89, name: "Silicona Exterior 1 lt.", price: 10500, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 267, code: 90, name: "Silicona Exterior 5 lts.", price: 41900, category: "cosmetica-automotor", emoji: "🚗", unavailable: true },
  { id: 268, code: "39*40", name: "Detergente tipo Ala lavavajillas", price: 9500, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 269, code: "41*42", name: "Detergente Neutro lavavajillas", price: 9700, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 270, code: "43*44", name: "Detergente Premiun lavavajillas", price: 9900, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 271, code: 372, name: "Tabletas lavavajillas x 10", price: 5400, category: "detergentes", emoji: "🧴", unavailable: false },
  { id: 272, code: 179, name: "Carbón 4 kg. Especial Parrillero", price: 5800, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 273, code: 180, name: "Carbón 8kg. Especial Parrillero", price: 10500, category: "fuego", emoji: "🔥", unavailable: true },
  { id: 274, code: 354, name: "Carbón 8kg. Especial Parrillero Premium Quebracho", price: 16900, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 275, code: 181, name: "Leña 10 kg. Aprox.", price: 9000, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 276, code: 183, name: "Iniciador de fuego Cajita", price: 2500, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 277, code: 182, name: "Atados Madera", price: 2500, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 278, code: 184, name: "Iniciador de fuego Pastillas", price: 4500, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 279, code: 175, name: "Fosforos de madera 222 Patito", price: 2300, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 280, code: 261, name: "Alcohol de Quemar x1Lt.", price: 5200, category: "fuego", emoji: "🔥", unavailable: false },
  { id: 281, code: "159*160", name: "Apresto para Ropa", price: 7900, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 282, code: 428, name: "Aromatizador textil Smell 200cc", price: 6200, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 283, code: 401, name: "Pastillas Limpia Lavarropas", price: 1500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 284, code: "01*02", name: "Jabón Líquido para Ropa tipo Skip Clásico", price: 7500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 285, code: "03*04", name: "Jabón Líquido para Ropa tipo Ariel Clásico", price: 7500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 286, code: "05*06", name: "Jabón Líquido para Ropa tipo Skip Premiun", price: 9500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 287, code: "07*08", name: "Jabón Líquido para Ropa tipo Ariel Premiun", price: 9500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 288, code: "09*10", name: "Jabon Líquido Ropa Delicada tipo Camellito", price: 9900, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 289, code: "15*16", name: "Lavandina Ropa Blanca", price: 3500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 290, code: "17*18", name: "Lavandina Ropa Color", price: 3500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 291, code: "21*22", name: "Perfumina para Ropa fragancias varias", price: 23500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 292, code: "19*20", name: "Quita Manchas Textil", price: 8500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 293, code: 200, name: "Quitamanchas Trenet bolilla", price: 0, category: "lavanderia", emoji: "👕", unavailable: true },
  { id: 294, code: 273, name: "Quitamanchas Trenet Doypack 400CC", price: 2500, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 295, code: "11*12", name: "Suavizante Celeste tipo Vivere", price: 6000, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 296, code: "13*14", name: "Suavizante Premiun Máxima Fragancia", price: 7400, category: "lavanderia", emoji: "👕", unavailable: false },
  { id: 297, code: "35*36", name: "Desengrasante Odex tipo Mr. Musculo", price: 5600, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 298, code: "23*24", name: "Desengrasante Multiuso cocina y baño", price: 5900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 299, code: "25*26", name: "Desengrasante Industrial Limpia Hornos", price: 6900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 300, code: "161*162", name: "Desengrasante Amoniacal", price: 8000, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 301, code: "326*327", name: "Desengrasante Total Remo.", price: 15900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 302, code: "145*146", name: "Destapa Cañerias", price: 23900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 303, code: 264, name: "Destapa Cañerias Zelnova x900ml", price: 4600, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 304, code: "37*38", name: "Jabón Líquido para Manos fragancias varias", price: 9300, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 305, code: "29*30", name: "Lavandina en Gel multisuperficies", price: 7500, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 306, code: 137, name: "Limpia Metales Venus 225cc", price: 5900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 307, code: 168, name: "Limpia Metales Venus 425 cc", price: 7900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 308, code: "31*32", name: "Limpiador Cif Cremoso Ferro", price: 16000, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 309, code: 206, name: "Lustramuebles CIF gatillo", price: 5300, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 310, code: 178, name: "Limpiador CIF Pisos plastificados y flotantes", price: 7300, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 311, code: 272, name: "Limpiador BLEM Pisos plastificados y flotantes", price: 7600, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 312, code: 116, name: "Limpiador Suiza pisos marmol y concreto 900 cc", price: 4800, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 313, code: 149, name: "Limpiador Suiza pisos plastificados y flotantes 900 cc", price: 5100, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 314, code: "27*28", name: "Limpia Vidrios Ferro", price: 5900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 315, code: 102, name: "Lustra Muebles Ceramicol 360 CC", price: 0, category: "limpiadores", emoji: "🧽", unavailable: true },
  { id: 316, code: 148, name: "Lustra Muebles Danubio 360cc", price: 5400, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 317, code: 270, name: "Quita Sarro Rex x 500ml", price: 3900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 318, code: 170, name: "Quita Sarro Harpic x 500ml", price: 5900, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 319, code: "33*34", name: "Quita Sarro multisuperficies Ferro", price: 7000, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 320, code: 226, name: "Limpiador CIF Pisos Oxy-Gel 750 ML", price: 6700, category: "limpiadores", emoji: "🧽", unavailable: false },
  { id: 321, code: 367, name: "Pañuelos Elegante ind.", price: 400, category: "papel", emoji: "🧻", unavailable: false },
  { id: 322, code: 191, name: "Papel Bobina Eco x 2 unidades 2.000 usos", price: 19300, category: "papel", emoji: "🧻", unavailable: false },
  { id: 323, code: 77, name: "Papel Higiénico bolsón 10 rollos Doble Hoja premium 30 mts.", price: 0, category: "papel", emoji: "🧻", unavailable: true },
  { id: 324, code: 76, name: "Papel Higiénico Simple Hoja Individual 80 mts.", price: 1400, category: "papel", emoji: "🧻", unavailable: false },
  { id: 325, code: 252, name: "Papel Higiénico Simple Hoja 4x80 mts.", price: 0, category: "papel", emoji: "🧻", unavailable: true },
  { id: 326, code: 188, name: "Papel Higiénico bolsón 10 rollos Simple Hoja premium 70 mts.", price: 10800, category: "papel", emoji: "🧻", unavailable: false },
  { id: 327, code: 356, name: "Papel Higiénico Doble Hoja 4x30mts. Higienol", price: 3600, category: "papel", emoji: "🧻", unavailable: false },
  { id: 328, code: 236, name: "Papel Higiénico bolsón 12 rollos Doble Hoja premium 30 mts.", price: 10500, category: "papel", emoji: "🧻", unavailable: false },
  { id: 329, code: 78, name: "Papel Higiénico bolsón 6 rollos Doble Hoja premium 100 mts.", price: 11600, category: "papel", emoji: "🧻", unavailable: false },
  { id: 330, code: 187, name: "Papel Higiénico bolsón 12 rollos triple hoja premium 20 mts.", price: 0, category: "papel", emoji: "🧻", unavailable: true },
  { id: 331, code: 79, name: "Papel Higiénico bolsón 10 rollos Triple Hoja premium 30 mts.", price: 11800, category: "papel", emoji: "🧻", unavailable: false },
  { id: 332, code: 225, name: "Papel Higiénico Elegante 8x300 mts. Cono grande Premium", price: 34900, category: "papel", emoji: "🧻", unavailable: false },
  { id: 333, code: 301, name: "Rollo de Cocina Individual 200 paños económico", price: 2200, category: "papel", emoji: "🧻", unavailable: false },
  { id: 334, code: 81, name: "Rollo de Cocina Individual 200 paños premium", price: 2600, category: "papel", emoji: "🧻", unavailable: false },
  { id: 335, code: 80, name: "Rollos de Cocina Bolsón 8 rollos x 200 paños c/u premium", price: 18900, category: "papel", emoji: "🧻", unavailable: false },
  { id: 336, code: 82, name: "Rollos de Cocina Paq. 3 rollos x 120 paños premium", price: 4700, category: "papel", emoji: "🧻", unavailable: false },
  { id: 337, code: 355, name: "Paq. Servilletas 32 x 27 x80 uds.", price: 1600, category: "papel", emoji: "🧻", unavailable: false },
  { id: 338, code: 190, name: "Caja Servilletas 32 x 27 x 1.000 unidades New pel", price: 11900, category: "papel", emoji: "🧻", unavailable: false },
  { id: 339, code: 189, name: "Toallas Intercaladas genéricas 24x19 4 paneles", price: 12500, category: "papel", emoji: "🧻", unavailable: false },
  { id: 340, code: 192, name: "Toallas Intercaladas Premium 24x19 4 paneles", price: 14900, category: "papel", emoji: "🧻", unavailable: false },
  { id: 341, code: 288, name: "Acople rápido Vulcano", price: 5900, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 342, code: 285, name: "Boya hongo chica", price: 2000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 343, code: "280*281", name: "Alguicida", price: 17000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 344, code: "282*283", name: "Clarificador", price: 17000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 345, code: "53*54", name: "Cloro Líquido", price: 6000, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 346, code: 284, name: "Cloro pastillas Triple Acción x 1/2 kilo", price: 6500, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 347, code: 111, name: "Cloro pastillas Triple Acción x1kg", price: 9500, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 348, code: "314*315", name: "Regulador PH MAK", price: 14900, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 349, code: 347, name: "Saca hojas Vulcano pileta", price: 14900, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 350, code: 312, name: "Test Kit Cloro y PH", price: 12500, category: "piscina", emoji: "🏊", unavailable: false },
  { id: 351, code: "45*46", name: "Desinfectante para pisos Lisoform", price: 3900, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 352, code: "47*48", name: "Desinfectante para pisos Citronela", price: 3900, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 353, code: "49*50", name: "Desinfectante para pisos fragancias varias", price: 3900, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 354, code: "165*166", name: "Echo en el balde Ferro", price: 6000, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 355, code: "129*130", name: "Desinfectante Acaroína", price: 8900, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 356, code: "51*52", name: "Lavandina Tradicional", price: 3500, category: "pisos", emoji: "🪣", unavailable: false },
  { id: 357, code: 410, name: "Bolsa Arranque A.D. 15x25", price: 4900, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 358, code: 237, name: "Bolsa Arranque A.D. 20x25", price: 5300, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 359, code: 334, name: "Bolsa Arranque A.D. 25x35", price: 9500, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 360, code: 328, name: "Bolsa Arranque A.D. 40x50", price: 12900, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 361, code: 411, name: "Bolsa Arranque A.D. 45x60", price: 15900, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 362, code: 265, name: "Rollo Papel Manteca", price: 2500, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 363, code: 266, name: "Rollo Papel Aluminio 30 mts.", price: 2600, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 364, code: 373, name: "Rollo Papel Aluminio 1/2 Kg.", price: 14900, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 365, code: 136, name: "Rollo Film Ecol 30x30mts.", price: 2600, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 366, code: 333, name: "Rollo Film 38x100mts", price: 7200, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 367, code: 240, name: "Rollo Film 38x300mts Alimenticio", price: 10600, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 368, code: 239, name: "Laminas para Freezer 25x37 1kg.", price: 7200, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 369, code: 241, name: "Bolsa Camiseta Negra A.D. 45x60 70uds.", price: 3500, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 370, code: 412, name: "Resma Papel A4 75grs x 500 Hojas", price: 9300, category: "papeleria", emoji: "✏️", unavailable: false },
  { id: 371, code: 238, name: "Vaso Plástico 180cc Blanco x100u", price: 7500, category: "papeleria", emoji: "✏️", unavailable: false },
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
        color: colors.primaryDark,
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
  const [error, setError] = useState(false);
  const fileName = String(product.code).replace(/\*/g, "-");
  const src = `/productos/${fileName}.jpg`;
  const baseStyle = { background: colors.mint, ...style };

  if (error) {
    return (
      <div
        className={`rounded-xl flex items-center justify-center ${className || ""}`}
        style={{ ...baseStyle, fontSize: emojiSize || 32 }}
      >
        {product.emoji}
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden ${className || ""}`} style={baseStyle}>
      <img
        src={src}
        alt={product.name}
        onError={() => setError(true)}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}

export default function LimpiezaApp() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState("limpiadores");
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [step, setStep] = useState(0); // 0 carrito, 1 entrega, 2 pago, 3 contacto, 4 resumen
  const [delivery, setDelivery] = useState<string | null>(null);
  const [address, setAddress] = useState({ calle: "", altura: "", barrio: "", referencia: "" });
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [contact, setContact] = useState({ nombre: "", telefono: "" });
  const [bump, setBump] = useState(false);
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
            <p style={{ color: colors.mint, fontSize: 13, marginTop: 2 }}>{STORE_TAGLINE}</p>
          </div>

          <button
            onClick={openCart}
            className="relative rounded-full flex items-center justify-center shrink-0"
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
                    <Plus size={16} color={colors.primaryDark} />
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
