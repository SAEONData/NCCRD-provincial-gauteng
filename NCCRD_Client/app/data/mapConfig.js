import { siteBaseURL, mapServerBaseURL } from '../js/config/serviceURLs.js'

export const MapConfig = {
    service: `${siteBaseURL + 'api/odata/projects/extensions.geojson' }`,
    //  "https://ccis.environment.gov.za/nccrd/api/odata/projects/extensions.geojson",
    domain: siteBaseURL,
    IDField: "properties.id",
    toolTipTitle: "properties.name",
    toolTipFields: [
        {
            field: "data.startYear", 
            alias: "Start Year"
        },
        {
            field: "data.endYear",
            alias: "End Year"
        },
        {
            field: "properties.id",
            alias: "Project ID"
        }
    ],
    styleField: "properties.typology",
    styles: [
        {
            value: 1,
            title: "Mitigation",
            default: true,
            icon:  `${mapServerBaseURL + '/blue_2.png' }`,//"https://ccis.environment.gov.za/map/blue_2.png",
            anchorX: 0,
            anchorY: 8
        },
        {
            value: 2,
            title: "Adaptation",
            icon: `${mapServerBaseURL + '/green.png' }`, //"https://ccis.environment.gov.za/map/green.png",
            anchorX: 0,
            anchorY: 8
        },
        {
            value: 3,
            title: "Research",
            icon: `${mapServerBaseURL + '/red.png' }`,//"https://ccis.environment.gov.za/map/red.png",
            anchorX: 0,
            anchorY: 8
        }
    ]
}