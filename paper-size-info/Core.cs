using System;
using System.Drawing.Printing;
using System.Text;

namespace paper_size_info
{
    internal class Core
    {

        public static void CoreFun(params string[] args)
        {
            var (help, all, paperName, cliRef) = new CliParameter(args);
            if (help)
            {
                cliRef.Help();
                return;
            }
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
                    sb.Append($@"""PaperName"":""{allPrinters[i]}""{JSONConst.JSON_SPLIT_SYMBOl}");
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
            sb.Append(JSONConst.JSON_OBJECT_PREFIX);
            sb.Append($@"""PaperName"":""{paperName}""{JSONConst.JSON_SPLIT_SYMBOl}");
            sb.Append($@"""PaperSizes"":{new PaperSizeOutputs(printerSettings.PaperSizes).GetOutStr()}");
            sb.Append(JSONConst.JSON_OBJECT_SUFFIX);
            Console.WriteLine(sb.ToString());
        }
    }
}
