# Binary Bit-Hunt - Soutěžní Aplikace pro DOD

Webová aplikace ve stylu sci-fi hackerského terminálu pro Dny otevřených dveří. Studenti hledají QR kódy, získávají binární sekvence a odemykají laboratoře.

## 🚀 Rychlé Spuštění (Docker)

Nejjednodušší způsob, jak aplikaci spustit kdekoliv (na serveru, na notebooku organizátora), je pomocí Dockeru.

**Požadavky:**

- Nainstalovaný [Docker Desktop](https://www.docker.com/products/docker-desktop/) nebo Docker Engine.

**Postup:**

1. **Stáhněte si tento projekt** (pokud ho ještě nemáte).
2. **Otevřete terminál** ve složce projektu.
3. **Spusťte příkaz:**

    ```bash
    docker compose up -d --build
    ```

    *(Tento příkaz aplikaci sestaví a spustí na pozadí)*

4. **Hotovo!** Aplikace běží na:
    👉 **<http://localhost:8080>**

### 🛑 Zastavení aplikace

Pokud chcete aplikaci vypnout:

```bash
docker compose down
```

---

## 🛠️ Lokální Vývoj (bez Dockeru)

Pokud chcete upravovat kód:

1. Nainstalujte závislosti: `npm install`
2. Spusťte vývojový server: `npm run dev`
3. Aplikace poběží na `http://localhost:5173`

## 📱 Funkce Aplikace

- **Terminál**: Hlavní obrazovka kde se zadávají binární kódy (4 bity).
- **Hledání QR kódů**: Studenti hledají fyzické QR kódy.
- **Odemykání**: Každý správný kód odemkne jednu "laboratoř".
- **Odměna**: Po odemčení všech 7 laboratoří se zobrazí obrazovka "Access Granted" s ověřovacím kódem.

### 🖨️ Generátor QR Kódů

Aplikace obsahuje nástroj pro tisk QR kódů:

- Jděte na **<http://localhost:8080/qr-generator>**
- Vytiskněte stránku (Ctrl+P) a rozmístěte kódy po budově.
- Pokud nelze naskenovat QR kód, lze se dostat na odpověď na stránkách **<http://localhost:8080/reveal/lab_01>** a postupně měnit čísla až na **<http://localhost:8080/reveal/lab_07>**.

## 🔐 Zabezpečení

- Aplikace je bezpečně uložena v Dockeru a není přístupná zvenčí.
- Všechna data jsou uložena v lokálním úložišti prohlížeče a jsou bezpečně uložena v Dockeru.

## 📝 Úpravy pro DOD

- V souboru **src/config/labs.js** jsou definovány laboratoře a jejich kódy.
- Doporučení: nenechávat tak očividné id laboratoří v QR kódech, ale spíše nějaké náhodné stringy. Např. **<http://localhost:8080/reveal/lab_01>** by mohlo být **<http://localhost:8080/reveal/lab_asdf123>**
