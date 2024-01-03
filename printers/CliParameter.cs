namespace printers
{
    internal class CliParameter
    {

        private static readonly string ALL_OUTPUT = "--all";

        public bool ThisAll { get; set; }

        public CliParameter(params string[] input)
        {
            foreach (var i in input)
            {
                if (ALL_OUTPUT.Equals(i.ToLower()))
                {
                    ThisAll = true;
                    break;
                }
            }
        }


        internal void Deconstruct(out bool all, out CliParameter cli)
        {
            all = ThisAll;
            cli = this;
        }
    }
}
