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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ex02.product.service.ProductService;
import com.springboot.ex02.product.vo.Product;

// 조회(리스트, 상세) => GET 방식
// 입력, 수정, 삭제 => POST 방식
// @RestController인 경우 @Responsebody 생략 가능

// RestAPI 문서 => rul, parameter, result 내역...

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
	// 상품 목록
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
	
	// 상품 등록
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
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
	
	// 상품 삭제
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public Map<String, Object> deleteProduct(@RequestBody HashMap<String, String> param) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		String resultMsg = "";
		String result = "";
		
		try {
			if(param.get("id") != null) {
				service.delete(Integer.parseInt(param.get("id")));
				resultMsg = "상품 삭제 성공";
				result = "success";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultMsg = "상품 등록에 실패했습니다.";
			result = "fail";
		}

		map.put("result", result);
		map.put("resultMsg", resultMsg);
		
		return map;
	}
	
	// 상품 수정
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public Map<String, Object> updateProduct(@RequestBody Product param, Model model) {
		
		Map<String, Object> map = new HashMap<>();
		
		Product resultVo = null;
		String resultMsg = "";
		String result = "";
		
		try {
			resultVo = service.save(param);
			if (resultVo.getId() != 0) {
				resultMsg = "상품 수정에 성공하였습니다.";
				result = "success";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultMsg = "상품 수정에 실패했습니다.";
			result = "fail";
		}

		map.put("result", result);
		map.put("resultId", resultVo.getId());
		map.put("resultMsg", resultMsg);
		return map;
	}
	
	// 상품 상세
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getProductDetail(@RequestParam String id, Model model) {
		
		Map<String, Object> map = new HashMap<>();
		
		Product resultVo = null;
		String resultMsg = "";
		String result = "";
		
		try {
			
			if (id != null) {
				resultVo = service.get(Integer.parseInt(id));
				resultMsg = "상품 상세조회에 성공하였습니다.";
				result = "success";
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultMsg = "상품 상세조회에 실패하였습니다.";
			result = "fail";
		}
		
		map.put("result", result);
		map.put("resultVo", resultVo);
		map.put("resultMsg", resultMsg);
		System.out.println("response data : " + map);
		
		return map;
	}
}