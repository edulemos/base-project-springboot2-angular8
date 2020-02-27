package com.baseproject.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.baseproject.dto.FileDto;
import com.baseproject.services.UploadService;


@RestController
public class UploadController {

	@Autowired
	UploadService uploadService;


	@PostMapping("/upload")
	public @ResponseBody FileDto handleFileUpload(@RequestParam(value = "file") MultipartFile multipartFile)
			throws IOException {

		return uploadService.upload(multipartFile);
	}

}
