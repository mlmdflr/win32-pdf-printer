using System;
using System.Collections.Generic;
using System.Text;

namespace paper_size_info
{
    internal class CliParameter
    {

        private static readonly string ALL_OUTPUT = "--all";

        private static readonly string[] HELP_OUTPUT = { "--h", "--help" };


        public bool ThisHelp { get; set; }
        public bool ThisAll { get; set; }
        public string ThisName { get; set; }


        public CliParameter(params string[] input)
        {
            foreach (var i in input)
            {
                if (((System.Collections.IList)HELP_OUTPUT).Contains(i.ToLower()))
                {
                    ThisHelp = true;
                    break;
                }
                if (ALL_OUTPUT.Equals(i.ToLower()))
                {
                    ThisAll = true;
                    break;
                }
                else
                {
                    ThisName = i;
                }
            }
        }


        public void Help()
        {
            Console.WriteLine($@"paper_size_info:
 Get Print Driver PaperSizes Details.
    Usage:
      paper_size_info [driverName] [options]
    Options:
      --all            Get All Driver Paper Sizes(return the paperSizes json array string)
      --h/-help        Help
    Return:
      paperSizes `json Object string`  or  `json array string`
");
        }

        internal void Deconstruct(out bool help, out bool all, out string paperName, out CliParameter cli)
        {
            help = ThisHelp;
            all = ThisAll;
            paperName = ThisName;
            cli = this;
        }
    }
}
