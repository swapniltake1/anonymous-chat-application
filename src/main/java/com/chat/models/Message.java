package com.chat.models;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

	private String name;
	private String content;
	private Timestamp time;
	

	
	
	
	
	
}
