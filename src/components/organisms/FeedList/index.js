/**
 * Created by terios on 1/18/17.
 */
import React, {Component} from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '100%',
    margin: 0,
    overflowY: 'auto'
  }
};

const FeedList = ({ tilesData, elementClick, ...props }) => {
  console.log(props)
  return (
    <div style={styles.root}>
      <GridList cellHeight={180} style={styles.gridList}>
        {tilesData.map((tile) => (
          <GridTile onClick={elementClick} key={tile.title} title={tile.title} subtitle={< span > by < b > {
            tile.author} </b></span >} actionIcon={< IconButton > <StarBorder color="white"/> </IconButton>}>
            <img src={tile.img}/>
          </GridTile>
        ))}
      </GridList>
    </div>
  )
};

export default FeedList;
