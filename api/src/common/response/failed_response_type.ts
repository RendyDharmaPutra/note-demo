type FailedResponseType<T> = RawResponseType & {
  success: false;
  error: T;
};
