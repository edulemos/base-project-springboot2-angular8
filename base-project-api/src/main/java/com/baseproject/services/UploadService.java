package com.baseproject.services;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.baseproject.dto.FileDto;

@Service
public class UploadService {

	@Value("${app.file.dir}")
	private String fileDir;

	public FileDto upload(MultipartFile multipartFile) throws IOException {
		new File(fileDir).mkdirs();
		
		String filePatch = fileDir + multipartFile.getOriginalFilename();
		File targetFile = new File(filePatch);
		multipartFile.transferTo(targetFile);
		
		FileDto dto = new FileDto();
		dto.setContentType(multipartFile.getContentType());
		dto.setName(multipartFile.getOriginalFilename());
		dto.setSize(multipartFile.getSize());
		
		return dto;
		
	}
	

	


}
