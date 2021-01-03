import React, { useState } from "react"
import { geoOrthographic, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import { presimplify, simplify } from "topojson-simplify"

const size = 300

let geoJson: any
fetch("land-110m.json")
  .then(response => response.json())
  .then(jsonData => {
    const simpleTopo = simplify(presimplify(jsonData), 10)
    geoJson = feature(simpleTopo, simpleTopo.objects.land)
  })

export const Globe = () => {
  const [rotation, changeRotation] = useState(0)

  const projection = geoOrthographic().fitSize([size, size], geoJson).rotate([rotation, 0])

  const geoGenerator = geoPath().projection(projection)

  const pathString = geoGenerator(geoJson)

  setTimeout(() => changeRotation(rotation + 0.2), 10)

  return (
    <svg width={size} height={size}>
      <path d={pathString as string} />
    </svg>
  )
}

export default Globe
