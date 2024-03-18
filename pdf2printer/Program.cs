using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace pdf2printer
{
    internal class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 1)
            {
                var printer = new PdfPrinter();
                printer.Print(args[0]);
            }else if (args.Length >= 2)
            {
                var printerName = args[0];
                var pdfile = args[1];
                var printer = new PdfPrinter(printerName);
                printer.Print(pdfile);
            }
        }
    }
}
