import React, { useEffect, useState } from "react"
import { geoPath } from "d3-geo"
import { geoPatterson } from "d3-geo-projection"
import { feature } from "topojson-client"
import styled from "@emotion/styled"

const Map = styled.svg`
  stroke: #fff;
  stroke-width: 0.2;
`

export const GameMap = () => {
  const [geoJson, changeGeoJson] = useState<any>()
  const [points, changePoints] = useState<[number, number][]>([])
  const width = 600
  const height = 400
  const r = 4

  useEffect(() => {
    fetch("countries-110m.json")
      .then(response => response.json())
      .then(jsonData => {
        changeGeoJson(feature(jsonData, jsonData.objects.countries))
      })
  }, [])

  const projection = geoPatterson().fitSize([width, height], geoJson)

  const geoGenerator = geoPath().projection(projection)

  const pathString = geoGenerator(geoJson)

  const addPoint = (event: any) => {
    const point: [number, number] = [+event.nativeEvent.layerX, +event.nativeEvent.layerY]
    changePoints([...points, point])
    console.log(projection.invert(point))
  }

  return (
    <Map width={width} height={height} onClick={e => addPoint(e)}>
      <path d={pathString as string} />
      {points.map(([x, y]) => (
        <circle cx={x} cy={y} r={r} stroke="blue" fill="green" />
      ))}
    </Map>
  )
}

export default GameMap
