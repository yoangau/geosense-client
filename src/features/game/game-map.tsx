import React, { useState } from "react"
import { geoPath } from "d3-geo"
import { geoPatterson } from "d3-geo-projection"
import { feature } from "topojson-client"
import styled from "@emotion/styled"
import useAsync from "../../hooks/use-async"

const width = 600
const height = 400

const Map = styled.svg`
  stroke: #fff;
  stroke-width: 0.2;
`
type Point = [number, number]

const loadMap = () =>
  fetch("countries-110m.json")
    .then(response => response.json())
    .then(jsonData => {
      const geoJson = feature(jsonData, jsonData.objects.countries)

      const projection = geoPatterson().fitSize([width, height], geoJson)

      const geoGenerator = geoPath().projection(projection)

      const pathString = geoGenerator(geoJson)
      return { pathString, invertProjection: projection.invert }
    })

export const GameMap = () => {
  const [points, changePoints] = useState<Point[]>([])
  const { value } = useAsync(loadMap)

  if (!value) return <></>

  const { pathString, invertProjection } = value

  const r = 4

  const addPoint = (event: any) => {
    const point: Point = [+event.nativeEvent.layerX, +event.nativeEvent.layerY]
    changePoints([...points, point])
    console.log(invertProjection(point))
  }

  return (
    <Map width={width} height={height} onClick={e => addPoint(e)}>
      <path d={pathString as string} />
      {points.map(([x, y], i) => (
        <circle key={`dot-${i}`} cx={x} cy={y} r={r} stroke="blue" fill="green" />
      ))}
    </Map>
  )
}

export default GameMap
