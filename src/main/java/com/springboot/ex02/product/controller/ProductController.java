package com.springboot.ex02.product.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ex02.product.service.ProductService;
import com.springboot.ex02.product.vo.Product;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:8040/")
public class ProductController {

	@Autowired
	ProductService service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public Map<String, Object> viewHome(Model model) {
		
		Map<String, Object> map = new HashMap<>();
		
		List<Product> list = service.listAll();
		
		map.put("list", list);
		
		return map; // 타임리프 방식임 => template/index.html
	};
	
}