# Mobile Scripting

This document is a Work in Progress

This document is not intended to be a substitute for the official Maximo Mobile API documentation. If any contradiction is present, you must consider the official documentation as the source of truth.

You must have a basic knowledge about Maximo and development, mainly Javascript, XML and HTTP requests. You must be also familiar with Maximo applications, modules, and REST API.

# About Maximo Mobile Scripting Repository

This repository is a source to share and learn how to customize different areas of Maximo Mobile. We will explore the best practices for creating code samples that showcase how to customize various areas of Maximo Mobile using JavaScript. Whether you're new to customisation or an experienced developer, this repo will provide you with the essential steps and tips to get started.

> **Important Notes**:
>
> 1. Although many of these codes were used on real Maximo Mobile development, there is no guarantee it will work on all cases due to the diversity of scenarios it can be applied.
> 2. Use these codes as a guide to start your customisation or to inspire you on something you need to do.
> 3. This repository is not intended to act as a communication channel to Maximo Support regarding defects. Use the normal support channels for reporting defects.

# Customisation table

|      Area      |   Sample    | Description                                                     |
| :------------: | :---------: | --------------------------------------------------------------- |
| Change Status  | sample01.js | Simple status filter as recommended by IBM                      |
|                | sample02.js | Filter status based on actual status                            |
|                | sample03.js | Do a validation before changing status                          |
|                | sample04.js | Async Validation Before Changing Status to check if log exists  |
|    Work Log    | sample01.js | Display the Log type on list view                               |
|   Inspection   | sample01.js | Check if inspection form has been completed from TECHMOBILE app |
| Computed Attr. | sample01.js | Add computed attribute to a datasource                          |
|                |             |                                                                 |

## Contribution

Contributions are what make the open source community an incredible place to learn, inspire, and create. Any contribution you make will be **greatly appreciated**.

1. Fork the project
2. Create a Branch for your Feature (`git checkout -b feature/AmazingFeature`)
3. Add your changes (`git add .`)
4. Commit your changes (`git commit -m "Adding an awesome Feature!"`)
5. Push the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request
