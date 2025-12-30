import { ProductType, ProductSubtype, MeasurementUnit, QualityStatus }  from 'src/common/enums/product.enum';

export const PRODUCT_TRANSLATIONS = {
  types: {
    [ProductType.WOOL]: 'Lã',
    [ProductType.MILK]: 'Leite',
    [ProductType.CHEESE]: 'Queijo',
    [ProductType.SUPPLY]: 'Insumo',
    [ProductType.OTHER]: 'Outro',
  },
  subtypes: {
    [ProductSubtype.GREASY]: 'Suja',
    [ProductSubtype.SCOURED]: 'Lavada',
    [ProductSubtype.SHREDDED]: 'Desfiada',
    [ProductSubtype.CARDED]: 'Cardada',
    [ProductSubtype.SPUN]: 'Fiada',
    [ProductSubtype.DYED]: 'Tingida',
    [ProductSubtype.NOT_APPLICABLE]: 'Não Aplicável',
  },
  units: {
    [MeasurementUnit.KG]: 'Quilo (kg)',
    [MeasurementUnit.LITER]: 'Litro (L)',
    [MeasurementUnit.UNIT]: 'Unidade (un)',
  },
  quality: {
    [QualityStatus.GOOD]: 'Bom',
    [QualityStatus.POOR]: 'Ruim',
  }
};