export function downloadUrl(src: string) {
  return fetch(src)
    .then(response => response.blob())
    .then(response => {
      const urlCreator = window.URL;
      const imageUrl = urlCreator.createObjectURL(response);
      const tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = src;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    })
}

export function convertArrayOfObjectsToCSV(args: any) {
  let data;
  let result: any;
  let ctr: any;
  let keys: any;
  let columnDelimiter: any;
  let lineDelimiter: any;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach((item: any) => {
    ctr = 0;
    keys.forEach((key: any) => {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

export function downloadCSV(array: any[]) {
  let data;
  let filename;
  let link;
  let csv = convertArrayOfObjectsToCSV({
    data: array
  });
  if (csv == null) {
    return;
  }

  filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

export function formatDate(timeStamp: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const time = new Date(timeStamp);
  return `${months[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`;
}
export enum MEDIA_TYPE {
  IMG = 'img',
  VIDEO = 'video'
}
export function getMediaType(src: string) {
  const imgReg = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
  const videoReg = /([a-z\-_0-9\/\:\.]*\.(mp4))/i;
  if (imgReg.test(src)) {
    return MEDIA_TYPE.IMG;
  } else if (videoReg.test(src)) {
    return MEDIA_TYPE.VIDEO;
  }
  return null;
}