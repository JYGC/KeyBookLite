package handlers

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
)

func getContentsFromMultipartFileHeader(fileHeader *multipart.FileHeader) (bytes.Buffer, error) {
	file, ex := fileHeader.Open()
	if ex != nil {
		return *bytes.NewBuffer(nil), ex
	}
	buffer := bytes.NewBuffer(nil)
	if _, ex := io.Copy(buffer, file); ex != nil {
		return *bytes.NewBuffer(nil), ex
	}

	return *buffer, nil
}

func SetDeviceHandlers(router *echo.Echo) {
	router.POST("/api/device/importcsv", func(context echo.Context) error {
		data := apis.RequestInfo(context).Data
		fmt.Printf("data: %v\n", data)
		return nil
	})
}
