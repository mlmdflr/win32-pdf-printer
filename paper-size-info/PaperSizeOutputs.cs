using System.Drawing.Printing;
using System.Text;
using static System.Drawing.Printing.PrinterSettings;

namespace paper_size_info
{
    internal class PaperSizeOutputs
    {

        private StringBuilder OutputStr { get; set; }


        public string GetOutStr()
        {
            return OutputStr.ToString();
        }


        public PaperSizeOutputs(PaperSizeCollection PaperSizes)
        {
            OutputStr = new StringBuilder();
            OutputStr.Append(JSONConst.JSON_ARRAYS_PREFIX);
            if (PaperSizes.Count > 0)
                for (int i = 0; i < PaperSizes.Count; i++)
                {
                    OutputStr.Append(ObjectOutputs(PaperSizes[i]));
                    if (i != PaperSizes.Count - 1) OutputStr.Append(JSONConst.JSON_SPLIT_SYMBOl);
                }
            OutputStr.Append(JSONConst.JSON_ARRAYS_SUFFIX);
        }


        private string ObjectOutputs(PaperSize PaperSize)
        {
            var str = new StringBuilder();
            str.Append(JSONConst.JSON_OBJECT_PREFIX);
            str.Append($@"
""Height"":{PaperSize.Height}{JSONConst.JSON_SPLIT_SYMBOl}
""Kind"":{(int)PaperSize.Kind}{JSONConst.JSON_SPLIT_SYMBOl}
""PaperName"":""{PaperSize.PaperName}""{JSONConst.JSON_SPLIT_SYMBOl}
""RawKind"":{PaperSize.RawKind}{JSONConst.JSON_SPLIT_SYMBOl}
""Width"":{PaperSize.Width}
");
            str.Append(JSONConst.JSON_OBJECT_SUFFIX);
            return str.ToString();
        }
    }
}
