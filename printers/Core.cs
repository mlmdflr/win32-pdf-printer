using System;
using System.Management;
using System.Text;

namespace printers
{
    class Core
    {
        public static void CoreFun(params string[] args)
        {
            var (all, _) = new CliParameter(args);
            var sb = new StringBuilder();
            if (all)
            {
                string wmiSQL = "SELECT * FROM Win32_Printer";
                ManagementObjectCollection printers = new ManagementObjectSearcher(wmiSQL).Get();
                sb.Append(JSONConst.JSON_ARRAYS_PREFIX);
                foreach (ManagementObject printer in printers)
                {
                    sb.Append(JSONConst.JSON_OBJECT_PREFIX);
                    sb.Append($@"""PrinterName"":{JSONConst.ToLiteral((string)printer.Properties["Name"].Value)}{JSONConst.JSON_SPLIT_SYMBOl}");
                    sb.Append($@"""DeviceID"":{JSONConst.ToLiteral((string)printer.Properties["DeviceID"].Value)}");
                    sb.Append(JSONConst.JSON_OBJECT_SUFFIX);
                    sb.Append(JSONConst.JSON_SPLIT_SYMBOl);
                }
                if (sb.Length > 1)
                {
                    sb.Remove(sb.Length - 1, 1);
                }
                sb.Append(JSONConst.JSON_ARRAYS_SUFFIX);
                Console.WriteLine(sb.ToString());
                return;
            }
            else
            {
                string wmiSQL = "SELECT * FROM Win32_Printer WHERE Default = true";
                ManagementObjectCollection printers = new ManagementObjectSearcher(wmiSQL).Get();
                foreach (ManagementObject printer in printers)
                {
                    sb.Append(JSONConst.JSON_OBJECT_PREFIX);
                    sb.Append($@"""PrinterName"":{JSONConst.ToLiteral((string)printer.Properties["Name"].Value)}{JSONConst.JSON_SPLIT_SYMBOl}");
                    sb.Append($@"""DeviceID"":{JSONConst.ToLiteral((string)printer.Properties["DeviceID"].Value)}");
                    sb.Append(JSONConst.JSON_OBJECT_SUFFIX);
                    Console.WriteLine(sb.ToString());
                    goto end;
                }
            end:
                if (sb.Length == 0)
                {
                    Console.WriteLine();
                }
            }

        }

    }
}
