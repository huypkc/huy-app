import * as React from "react";
import * as Autocomplete from "react-autocomplete";
import { connect, Dispatch } from "react-redux";
import { fetchListNasa } from "../core/actions/NasaAction";
interface IProps {
  items: any[];
  dispatch: Dispatch<any>;
}
interface IPassedProps {
  selectItem: any;
}
class NasaSearch extends React.Component<IProps & IPassedProps, {value: string, item: any}> {
  public state = {
    value: '',
    item: {
      data: [{
        title: '',
        description: '',
        src: ''
      }],
      links: [{href:''}]
    }
  }

  public timeoutCb: any;

  constructor(props: any) {
    super(props);
  }

  public onSelect(item: any) {
    this.setState({item});
    this.props.selectItem(item);
  }

  public render() {
    return (
      <div>
        <Autocomplete
          inputProps={{ id: 'nasa-autocomplete' }}
          wrapperStyle={{ position: 'relative', display: 'inline-block', width: '100%' }}
          value={this.state.value}
          items={this.props.items || []}
          getItemValue={(item) => item.data[0].title}
          onSelect={(value: string, item: any) => this.onSelect(item)}
          onChange={(event, value) => {
            this.setState({ value })
            if (this.timeoutCb) {
              clearTimeout(this.timeoutCb);
            }
            this.timeoutCb = setTimeout(() => this.props.dispatch(fetchListNasa(value)), 400);
          }}
          renderMenu={ children => (
            <div className="menu">
              {this.props.items && this.props.items.length? children: 'No result'}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <li
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.data[0].nasa_id}
            ><a>{item.data[0].title}</a></li>
          )}
        />
        <div id="nasa-item-detail">
          <div><strong>Title:</strong> {this.state.item.data[0].title}</div>
          <div><strong>Description:</strong> {this.state.item.data[0].description.slice(0, 150)}</div>
          <div><strong>Source:</strong> {this.state.item.links[0].href}</div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: any) => {
  return {
    items: state.NasaReducer.list,
  };
};

export default connect<any, any, IPassedProps>(mapStateToProps)(NasaSearch);