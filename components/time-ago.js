import moment from "moment";
import React from "react";

const TimeAgo = ({ timestamp }) => {
  const timeAgo = moment(timestamp).fromNow();

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
