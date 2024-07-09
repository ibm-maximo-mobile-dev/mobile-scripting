# Validate if an Inspection was completed from TECHMOBILE

In many scenarios, clients want to validate if an inspection attached to the Work Order has been completed before closing the WO or changing its status.

By the time being, there is no API to verify whether a inspection form was completed from a work order in the TECHMOBILE.

These two sample code will show you how you can save the inspection status and use it on a work order for validations.

The `sample01-INSPECTION.js` will save the inspection status to the `localStorage` and the `sample01-TECHMOBILE.js` will retrieve the details to be used on the WO validation.