export function calculateExecution({
  elements,
  priceLibrary,
  laborRate,
  regionFactor,
  indexFactor
}) {

  let totalMaterial = 0
  let totalLabor = 0

  const breakdown = elements.map(el => {

    const lib = priceLibrary[el.code]
    if (!lib) throw new Error("Onbekend element: " + el.code)

    const baseMaterial = lib.material * el.quantity
    const baseLabor =
      lib.labor_hours * laborRate * el.quantity

    const material =
      baseMaterial * regionFactor * indexFactor

    const labor =
      baseLabor * regionFactor * indexFactor

    totalMaterial += material
    totalLabor += labor

    return {
      code: el.code,
      name: lib.name,
      quantity: el.quantity,
      material,
      labor,
      total: material + labor
    }
  })

  return {
    breakdown,
    totalMaterial,
    totalLabor,
    total: totalMaterial + totalLabor
  }
}