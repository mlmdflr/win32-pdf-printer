﻿namespace paper_size_info
{
    internal class CliParameter
    {

        private static readonly string ALL_OUTPUT = "--all";

        public bool ThisAll { get; set; }
        public string ThisName { get; set; }


        public CliParameter(params string[] input)
        {
            foreach (var i in input)
            {
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


        internal void Deconstruct( out bool all, out string paperName, out CliParameter cli)
        {
            all = ThisAll;
            paperName = ThisName;
            cli = this;
        }
    }
}
