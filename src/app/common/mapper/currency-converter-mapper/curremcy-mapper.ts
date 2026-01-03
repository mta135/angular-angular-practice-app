import { CurrencyCode } from "../../../enums/currencty-converter/currency-code-enum";
import { ExchangeProvider } from "../../../enums/currencty-converter/currency-exchage-provider-enum";

export class CurrencyMapper {

    private static readonly CodeFullName: Record<string, string> = {

        [CurrencyCode.MDL]: "MDL - Leu moldovenesc",
        [CurrencyCode.EUR]: "EUR - Euro",
        [CurrencyCode.USD]: "USD - Dolar S.U.A.",
        [CurrencyCode.RUB]: "RUB - Rubla ruseasca",
        [CurrencyCode.RON]: "RON - Leu romanesc",
        [CurrencyCode.UAH]: "UAH - Hrivna ucraineana",
        [CurrencyCode.GBP]: "GBP - Lira sterlina",
        [CurrencyCode.CHF]: "CHF - Franc elvetian",
        [CurrencyCode.BGN]: "BGN - Leva bulgara",
        [CurrencyCode.PLN]: "PLN - Zlot polonez",
        [CurrencyCode.CAD]: "CAD - Dolar canadian",

        [CurrencyCode.CZK]: "CZK - Coroana ceha",
        [CurrencyCode.TRY]: "TRY - Lira turceasca",
        [CurrencyCode.HUF]: "HUF - Forint ungar",
        [CurrencyCode.CNY]: "CNY - Yuan Renminbi chinezesc",
        [CurrencyCode.AED]: "AED - Dirham E.A.U.",
        [CurrencyCode.ALL]: "ALL - Lek albanez",
        [CurrencyCode.AMD]: "AMD - Dram armenesc",
        [CurrencyCode.AUD]: "AUD - Dolar australian",
        [CurrencyCode.AZN]: "AZN - Manat azer",
        [CurrencyCode.BYN]: "BYN - Rubla belarusa",

        [CurrencyCode.BYR]: "BYR - Rubla bielorusa",
        [CurrencyCode.DKK]: "DKK - Coroana daneza",
        [CurrencyCode.EEK]: "EEK - Coroana estoniana",
        [CurrencyCode.GEL]: "GEL - Lari georgian",
        [CurrencyCode.HKD]: "HKD - Dolar Hong Kong",
        [CurrencyCode.HRK]: "HRK - Kuna croata",
        [CurrencyCode.ILS]: "ILS - Shekel israelian",
        [CurrencyCode.INR]: "INR - Rupia indiana",
        [CurrencyCode.ISK]: "ISK - Coroana islandeza",
        [CurrencyCode.JPY]: "JPY - Yen japonez",
        [CurrencyCode.KGS]: "KGS - Som kirghizz",
        [CurrencyCode.KRW]: "KRW - Won sud-coreean",
        [CurrencyCode.KWD]: "KWD - Dinar kuweitian",
        [CurrencyCode.KZT]: "KZT - Tenghe kazah",
        [CurrencyCode.LTL]: "LTL - Lit lituanian",
        [CurrencyCode.LVL]: "LVL - Lat leton",
        [CurrencyCode.MKD]: "MKD - Denar macedonian",
        [CurrencyCode.MYR]: "MYR - Ringgit malayezian",
        [CurrencyCode.NZD]: "NZD - Dolar neozeelandez",
        [CurrencyCode.RSD]: "RSD - Dinar sirb",
        [CurrencyCode.SEK]: "SEK - Coroana suedeza",
        [CurrencyCode.SKK]: "SKK - Koruna slovaca",
        [CurrencyCode.TJS]: "TJS - Somoni tadjic",
        [CurrencyCode.TMT]: "TMT - Manat turkmen",
        [CurrencyCode.UZS]: "UZS - Sum uzbek",
        [CurrencyCode.XDR]: "XDR - D.S.T."
    };

    private static readonly ProiderName: Record<string, string> = {

        [ExchangeProvider.Bnm]: "BNM - Banca Națională a Moldovei",
        [ExchangeProvider.VictoriaBank]: "VictoriaBank - Grupul Banca Transilvania",
        [ExchangeProvider.Maib]: "Moldova Agroindbank",
        [ExchangeProvider.Micb]: "Moldindconbank",
        [ExchangeProvider.EnergBank]: "ENERGBANK",
        [ExchangeProvider.EximBank]: "EXIMBANK",
        [ExchangeProvider.MobiasBanca]: "OTP Bank",
        [ExchangeProvider.FincomBank]: "FinComBank",
        [ExchangeProvider.ComertBank]: "BC COMERTBANK"

    }

    public static SetCodeFullName(code: string): string {
        return this.CodeFullName[code];
    }

    public static SetProviderFullName(name: string): string {
        return this.ProiderName[name];
    }
}