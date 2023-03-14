# Umbraco.Cms.Integrations.PIM.Inriver

This integration provides a custom product picker that can be used as a property editor 
for content, a value converter providing a strongly typed model for rendering and a sample
rendering component for selected products in [inriver](https://www.inriver.com/).

## Prerequisites

Required minimum versions of Umbraco CMS: 
- CMS: 10.3.0

## How To Use

### Authentication

Accessing the resources from inriver through the REST API requires an API key, which will be included with each request using the `X-InRiver-APIKey` header.

To retrieve your API key and the API instance of your environment, you need to go in the _Users_ section of the _Control Center_ and generate your key. 

### Configuration

The following configuration is required for working with the inriver API:

```
{
  "Umbraco": {
    "CMS": {
      "Integrations": {
        "PIM": {
          "Inriver": {
            "Settings": {
              "ApiBaseUrl": "https://[API_instance].productmarketingcloud.com/",
              "ApiKey": "[API_key]"
            }
          }
        }
      }
    }
  }
}
```

### Backoffice usage

To use the product picker, a new data type should be created based on the `inriver Entity Picker` property editor.

If the configuration is not valid, an error message will be displayed.

Otherwise, you will be able to toggle between the __inriver__ entity types of your environment and pick which columns you want displayed.

You select the entity type you want to fetch data for, and you get the list of fields and the linked entities for the selected type.

### Front-end rendering

A strongly typed model will be generated by the property value converter and an HTML helper is available to easily render the product on the front-end.

Make sure your template has a reference to the following using statement:
```
@using Umbraco.Cms.Integrations.PIM.Inriver.Helpers;
```

And render the product using (assuming a property based on the created data type, with alias `InriverProductPicker` has been created):
```
@Html.RenderInriverEntity(Model.InriverProductPicker)
```

You can override the sample rendering component with one of your own by specifying a new path for the view, and use render the details of linked entities as well, details referenced under the `Outbound` property.