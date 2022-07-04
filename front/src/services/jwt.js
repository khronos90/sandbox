import cryptoJs from "crypto-js";

export const jwtGenerator = ({ header, payload, secret }) => {
  // var header = {
  //   alg: "HS256",
  //   typ: "JWT",
  // };

  // var data = {
  //   id: 1337,
  //   username: "john.doe",
  // };

  // var secret = "My very confidential secret!!!";

  var stringifiedHeader = cryptoJs.enc.Utf8.parse(JSON.stringify(header));
  var encodedHeader = cryptoJs.enc.Base64url.stringify(stringifiedHeader);

  var stringifiedData = cryptoJs.enc.Utf8.parse(JSON.stringify(payload));
  var encodedData = cryptoJs.enc.Base64url.stringify(stringifiedData);

  var signature = encodedHeader + "." + encodedData;
  signature = cryptoJs.HmacSHA256(signature, secret);
  signature = cryptoJs.enc.Base64url.stringify(signature);

  return `${encodedHeader}.${encodedData}.${signature}`;
};
