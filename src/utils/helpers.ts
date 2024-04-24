interface ITruncateString {
  str: string;
  num: number;
  truncated: boolean;
}

export function truncateString({ str, num, truncated }: ITruncateString) {
  if (str.length > num && truncated === true) {
    let truncatedString = str.slice(0, num);
    truncatedString = truncatedString.slice(
      0,
      truncatedString.lastIndexOf(' ')
    );

    return truncatedString;
  } else {
    return str;
  }
}
