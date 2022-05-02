package com.springboot.ex02.product.vo;

// 패키지 javax.persistence.xxx
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {
	
	private int id;
	private String name;
	private String madein;
	private String brand;
	private int price;
	
	// 식별자 - PK
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // PK(id)를 AUTO_INCREMENT로 생성한 경우
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMadein() {
		return madein;
	}

	public void setMadein(String madein) {
		this.madein = madein;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
	
	
}