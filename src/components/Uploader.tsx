import * as React from "react";
import { upload } from "../core/cloudinary";
import { MEDIA_TYPE } from "../core/util";

class Uploader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '', message: '' };
  }

  public handleSubmit = () => {
    this.setState({message: 'Uploading...'})
    upload(this.state.file)
      .then((url: string) =>
        {
          this.props.onUploadDone(url);
          this.setState({message: 'Successful.'})
        }
      )
      .catch(() => this.setState({message: 'Failed, Please try again.'}));
  }

  public handleImageChange = (e: any) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      }, () => this.handleSubmit());
    }
    reader.readAsDataURL(file);
  }

  public render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    const type = this.state.file && this.state.file.type.indexOf('image')> -1? MEDIA_TYPE.IMG: MEDIA_TYPE.VIDEO;
    if (type === MEDIA_TYPE.IMG) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else if (type === MEDIA_TYPE.VIDEO) {
      $imagePreview = (<video width="320" height="240">
        <source src={imagePreviewUrl} type="video/mp4" />
        <source src={imagePreviewUrl} type="video/ogg" />
        Your browser does not support the video tag.
    </video>);
    }

    return (
      <div className="previewComponent AlignCenter">
        <div>{this.state.message}</div>
        <input className="fileInput"
          type="file"
          accept='video/*,image/*'
          onChange={this.handleImageChange} />
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
export default Uploader;