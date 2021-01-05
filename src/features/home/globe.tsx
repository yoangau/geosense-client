import React, { useEffect, useState } from "react"
import { geoOrthographic, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import { presimplify, simplify } from "topojson-simplify"

export const Globe = () => {
  const [rotation, changeRotation] = useState(0)
  const [geoJson, changeGeoJson] = useState<any>()
  const size = 300

  useEffect(() => {
    fetch("land-110m.json")
      .then(response => response.json())
      .then(jsonData => {
        const simpleTopo = simplify(presimplify(jsonData), 10)
        changeGeoJson(feature(simpleTopo, simpleTopo.objects.land))
      })
  }, [])

  useEffect(() => {
    setTimeout(() => changeRotation(rotation + 0.2), 10)
  }, [rotation])

  const projection = geoOrthographic().fitSize([size, size], geoJson).rotate([rotation, 0])

  const geoGenerator = geoPath().projection(projection)

  const pathString = geoGenerator(geoJson)

  return (
    <svg width={size} height={size}>
      <path d={pathString as string} />
    </svg>
  )
}

export default Globe
