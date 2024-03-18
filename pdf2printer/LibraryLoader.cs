using System;
using System.ComponentModel;
using System.Runtime.InteropServices;

namespace pdf2printer
{

    internal class LibraryLoader
    {
        public static LoadResult OpenLibrary(string fileName)
        {
            var loadedLib = LoadLibrary(fileName);

            if (loadedLib == IntPtr.Zero)
            {
                var errorCode = Marshal.GetLastWin32Error();
                var errorMessage = new Win32Exception(errorCode).Message;
                return LoadResult.Failure(errorMessage);
            }

            return LoadResult.Success;
        }

        [DllImport("kernel32", SetLastError = true, CharSet = CharSet.Auto)]
        private static extern IntPtr LoadLibrary([MarshalAs(UnmanagedType.LPTStr)] string lpFileName);
    }
}