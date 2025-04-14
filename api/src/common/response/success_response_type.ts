type SuccessResponseType<T> = RawResponseType & {
  success: true;
  data: T extends any[] ? ResponseData<T[number]> : T;
};
