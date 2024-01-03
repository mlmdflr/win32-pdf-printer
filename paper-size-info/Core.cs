using System;
using System.Drawing.Printing;
using System.Text;

namespace paper_size_info
{
    internal class Core
    {

        public static void CoreFun(params string[] args)
        {
            var (all, paperName, _) = new CliParameter(args);

            //reuse variable
            PrinterSettings printerSettings = new PrintDocument().PrinterSettings;

            var sb = new StringBuilder();
            if (all)
            {
                var allPrinters = PrinterSettings.InstalledPrinters;
                sb.Append(JSONConst.JSON_ARRAYS_PREFIX);
                for (int i = 0; i < allPrinters.Count; i++)
                {
                    sb.Append(JSONConst.JSON_OBJECT_PREFIX);
                    sb.Append($@"""PrinterName"":{JSONConst.ToLiteral(allPrinters[i])}{JSONConst.JSON_SPLIT_SYMBOl}");
                    sb.Append($@"""TaskNumber"":{TaskNumber.GetTaskNumber(allPrinters[i])}{JSONConst.JSON_SPLIT_SYMBOl}");
                    int status = Status.GetPrinterStatusInt(allPrinters[i]);
                    sb.Append($@"""Status"":{status}{JSONConst.JSON_SPLIT_SYMBOl}");
                    sb.Append($@"""StatusMsg"":{Status.GetPrinterStatus(status)}{JSONConst.JSON_SPLIT_SYMBOl}");
                    printerSettings.PrinterName = allPrinters[i];
                    sb.Append($@"""PaperSizes"":{new PaperSizeOutputs(printerSettings.PaperSizes).GetOutStr()}");
                    sb.Append(JSONConst.JSON_OBJECT_SUFFIX);
                    if (i != allPrinters.Count - 1) sb.Append(JSONConst.JSON_SPLIT_SYMBOl);
                }
                sb.Append(JSONConst.JSON_ARRAYS_SUFFIX);
                Console.WriteLine(sb.ToString());
                return;
            }
            if (!string.Empty.Equals(paperName)) printerSettings.PrinterName = paperName;
            if (!string.Empty.Equals(printerSettings.PrinterName) && Exists(printerSettings.PrinterName))
            {
                sb.Append(JSONConst.JSON_OBJECT_PREFIX);
                sb.Append($@"""PrinterName"":{JSONConst.ToLiteral(printerSettings.PrinterName)}{JSONConst.JSON_SPLIT_SYMBOl}");
                sb.Append($@"""TaskNumber"":{TaskNumber.GetTaskNumber(printerSettings.PrinterName)}{JSONConst.JSON_SPLIT_SYMBOl}");
                int status = Status.GetPrinterStatusInt(printerSettings.PrinterName);
                sb.Append($@"""Status"":{status}{JSONConst.JSON_SPLIT_SYMBOl}");
                sb.Append($@"""StatusMsg"":{Status.GetPrinterStatus(status)}{JSONConst.JSON_SPLIT_SYMBOl}");
                sb.Append($@"""PaperSizes"":{new PaperSizeOutputs(printerSettings.PaperSizes).GetOutStr()}");
                sb.Append(JSONConst.JSON_OBJECT_SUFFIX);
            }
            Console.WriteLine(sb.ToString());
        }

        private static bool Exists(string printerName)
        {
            var allPrinters = PrinterSettings.InstalledPrinters;
            for (int i = 0; i < allPrinters.Count; i++)
            {
                if (allPrinters[i] == printerName)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
