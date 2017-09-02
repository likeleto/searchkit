import * as React from "react";
import { ShowMoreProps } from './ShowMoreProps'

export class ShowMoreButton extends React.Component<ShowMoreProps, {}> {
  render(){
    const { onShowMore, hasMore, isLoading } = this.props
    if (!hasMore) return null

    return (
      <div className="sk-pagination-show-more">
        {isLoading
           ? <button className="sk-button" disabled={true}>Loading...</button>
           : <button className="sk-button" onClick={onShowMore}>Show More</button>
          }
      </div>
    );
  }
}
