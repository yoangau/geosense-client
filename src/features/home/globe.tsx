import React, { useEffect, useState } from "react"
import { ExtendedGeometryCollection, GeoGeometryObjects, geoOrthographic, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import { presimplify, simplify } from "topojson-simplify"
import useAsync from "../../hooks/use-async"

const loadMap = () =>
  fetch("land-110m.json")
    .then(response => response.json())
    .then(jsonData => {
      const simpleTopo = simplify(presimplify(jsonData), 10)
      return (feature(
        simpleTopo,
        simpleTopo.objects.land,
        // weird type interaction between topojson.feature and d3-geo.GeoProjection.fitSize
      ) as unknown) as ExtendedGeometryCollection<GeoGeometryObjects>
    })

export const Globe = () => {
  const { value: geoJson } = useAsync(loadMap)
  const [rotation, changeRotation] = useState(0)
  useEffect(() => {
    setTimeout(() => changeRotation(rotation + 0.2), 10)
  }, [rotation])

  if (!geoJson) return <></>

  const size = 300

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
