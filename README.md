# PicSure

PicSure uses special hardware to ensure pictures have never been manipulated.

Team Drop Table's submission for CU Big Data class final project.

### Project Components
Service | Description
------- | -----------
[API](api) | Our project's backend. It is the endpoint that both the cameras and image viewers talk to. Written in Python using Django.
[Camera Simulator](camerasimulator) | An application that simulates the physical hardware our project would contain if we weren't in a software class.
[Image Viewer](imageviewer) | An application that lets users view an image and tells them if the image has been modified in some way.
