package com.example.jalitsu3.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Event {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long eventId;
	private String eventName;
	private String type;
	private String date;
	private String time;
	private String place;
	
	public Event() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Event(Long eventId, String eventName, String type, String date, String time, String place) {
		super();
		this.eventId = eventId;
		this.eventName = eventName;
		this.type = type;
		this.date = date;
		this.time = time;
		this.place = place;
	}
	
	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public Event(String eventName, String type, String date, String time, String place) {
		super();
		this.eventName = eventName;
		this.type = type;
		this.date = date;
		this.time = time;
		this.place = place;
	}

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "Event [eventId=" + eventId + ", eventName=" + eventName + ", type=" + type + ", date=" + date
				+ ", time=" + time + ", place=" + place + "]";
	}

	
}
