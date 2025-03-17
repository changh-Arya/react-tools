query getSalesAdminsByRelatedProduct($relatedProduct: String!, $relatedProductLob: [String], $relatedProductCateg: [String]) {
  adoSalesAdminTemplateList(
    filter: {
      relatedProduct: {_expressions: {value: $relatedProduct, _operator: EQUALS}},
      relatedProductLineOfBusiness: {_expressions: {values: $relatedProductLob, _operator: EQUALS, _apply: AT_LEAST_ONCE}},
      relatedProductCategoriesSubCategories: {_expressions: {values: $relatedProductCateg, _operator: EQUALS,  _apply: AT_LEAST_ONCE}}
      _logOp: OR
    }
  ) {
    items {
      _path
      category
      titleEn
      titleZh
      contentType
      hotLabel
      dateStampDateStartDate
      dateStampEndDate
      publishDate
      expirationDate
      relatedProduct
      relatedProductLineOfBusiness
      relatedProductCategoriesSubCategories
      sectionTitle1En
      sectionContent1En {
        html
      }
      sectionTitle2En
      sectionContent2En {
        html
      }
      sectionTitle3En
      sectionContent3En {
        html
      }
      sectionTitle4En
      sectionContent4En {
        html
      }
      sectionTitle5En
      sectionContent5En {
        html
      }
      sectionTitle6En
      sectionContent6En {
        html
      }
      sectionTitle7En
      sectionContent7En {
        html
      }
      sectionTitle8En
      sectionContent8En {
        html
      }
      sectionTitle9En
      sectionContent9En {
        html
      }
      sectionTitle1Zh
      sectionContent1Zh {
        html
      }
      sectionTitle2Zh
      sectionContent2Zh {
        html
      }
      sectionTitle3Zh
      sectionContent3Zh {
        html
      }
      sectionTitle4Zh
      sectionContent4Zh {
        html
      }
      sectionTitle5Zh
      sectionContent5Zh {
        html
      }
      sectionTitle6Zh
      sectionContent6Zh {
        html
      }
      sectionTitle7Zh
      sectionContent7Zh {
        html
      }
      sectionTitle8Zh
      sectionContent8Zh {
        html
      }
      sectionTitle9Zh
      sectionContent9Zh {
        html
      }
      _metadata {
        calendarMetadata {
          name
          value
        }
      }
    }
  }
}
