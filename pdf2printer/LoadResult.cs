namespace pdf2printer
{
    public class LoadResult
    {
        private LoadResult(bool isSuccess, string errorMessage)
        {
            IsSuccess = isSuccess;
            ErrorMessage = errorMessage;
        }

        public static LoadResult Success { get; } = new LoadResult(true, null);

        public static LoadResult Failure(string errorMessage)
        {
            return new LoadResult(false, errorMessage);
        }

        public bool IsSuccess { get; }
        public string ErrorMessage { get; }
    }

}

