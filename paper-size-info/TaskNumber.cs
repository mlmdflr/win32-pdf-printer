using System;
using System.Runtime.InteropServices;

namespace paper_size_info
{

    class TaskNumber
    {
        [DllImport("winspool.drv", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern bool OpenPrinter(string pPrinterName, out IntPtr hPrinter, IntPtr pDefault);

        [DllImport("winspool.drv", CharSet = CharSet.Auto)]
        public static extern int EnumJobs(IntPtr hPrinter, int FirstJob, int NoJobs, int Level, IntPtr pInfo, int cdBuf, out int pcbNeeded, out int pcReturned);

        public static int GetTaskNumber(string printerName)
        {
            int FirstJob = 0;
            int NumJobs = 127;
            OpenPrinter(printerName, out IntPtr handle, IntPtr.Zero);
            // get num bytes required, here we assume the maxt job for the printer quest is 128 (0..127)
            EnumJobs(handle, FirstJob, NumJobs, 1, IntPtr.Zero, 0, out int pcbNeeded, out _);
            // allocate unmanaged memory
            IntPtr pData = Marshal.AllocHGlobal(pcbNeeded);
            // get structs
            _ = EnumJobs(handle, FirstJob, NumJobs, 1, pData, pcbNeeded, out _, out int pcReturned);
            return pcReturned;
        }

    }
}
