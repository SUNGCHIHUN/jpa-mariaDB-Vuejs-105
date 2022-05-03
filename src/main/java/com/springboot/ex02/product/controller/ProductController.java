package com.springboot.ex02.product.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ex02.product.service.ProductService;
import com.springboot.ex02.product.vo.Product;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:8040")
public class ProductController {

	@Autowired
	ProductService service;
	
	// 시작점
	@GetMapping(value = "/product")	// http://localhost:8040/api/product
	public List<Product> fetchProduct() {
		return service.listAll();
		// 실행 결과
		// [{"id":2,"name":"노트북","madein":"한국","brand":"LG","price":20000000},{"id":3,"name":"아이폰","madein":"미국","brand":"애플","price":1000000},{"id":4,"name":"갤럭시","madein":"한국","brand":"삼성","price":1300000}]
	}
	
	// REST API 방식 => json 데이터를 vueJS로 리턴
	
	// index: 리스트 가져오기
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public Map<String, Object> viewHome(Model model) {
		
		Map<String, Object> map = new HashMap<>();
		
		try {
			List<Product> list = service.listAll();
			map.put("list", list);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return map; // json 데이터
	};
	
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> regProduct(@RequestBody Product param, Model model) {
		// create.js/createProduct의 payload 값이 param으로 전달
		
		Map<String, Object> map = new HashMap<>();
		
		Product resultVo = null;
		String resultMsg = "";
		String result = "";
		
		try {
			resultVo = service.save(param);
			if (resultVo.getId() != 0) {
				resultMsg = "상품 등록에 성공하였습니다.";
				result = "success";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultMsg = "상품 등록에 실패했습니다.";
			result = "fail";
		}

		map.put("result", result);
		map.put("resultId", resultVo.getId());
		map.put("resultMsg", resultMsg);
		return map;
	}
}