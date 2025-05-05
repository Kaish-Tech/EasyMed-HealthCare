package com.qsp.Hospital_Management.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qsp.Hospital_Management.model.Billing;
import com.qsp.Hospital_Management.service.BillingService;

@RestController
@RequestMapping("api/bills")
public class BillingController {
	
	@Autowired
	private BillingService billingService;
	
	@PostMapping("/save")
	public ResponseEntity<Billing> saveBilling(@RequestBody Billing billing) {
		Billing savedBill= billingService.saveBilling(billing);
		return new ResponseEntity<>(savedBill,HttpStatus.CREATED);
	}

	@GetMapping("/fetchAll")
	public ResponseEntity<List<Billing>> getAllBillings() {
		List<Billing> bill= billingService.getAllBillings();
		return new ResponseEntity<>(bill,HttpStatus.OK);
	}


	@GetMapping("/fetchBillById")
	public ResponseEntity<Billing> getBillingById(@RequestParam Long billId) {
		Billing billing= billingService.getBillingById(billId);
		if(billing!=null) {
			return new ResponseEntity<>(billing, HttpStatus.OK);
			
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/deleteBillById")
	public ResponseEntity<Billing> deleteBillingById(@RequestParam Long billId) {
		billingService.deleteBillingById(billId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PutMapping("/updateBillById")
	public ResponseEntity<Billing> updateBillingById(@RequestParam Long billId, @RequestBody Billing newBilling) {
		Billing updatedBilling= billingService.updateBillingById(billId, newBilling);
		if(updatedBilling!=null) {
			return new ResponseEntity<>(updatedBilling, HttpStatus.OK);
			
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/billStatus")
	public List<Billing> getBillingsByStatus(@RequestParam String status) {
		return billingService.getBillingsByStatus(status);
	}

	@GetMapping("/fetchPatientBill")
	public List<Billing> getBillingsByPatientId(@RequestParam Long patientId) {
		return billingService.getBillingsByPatientId(patientId);
	}

	@GetMapping("/billBetweenDates")
	public List<Billing> getBillingsBetweenDates(@RequestParam("start") LocalDate startDate, @RequestParam("end") LocalDate endDate) {
		return billingService.getBillingsBetweenDates(startDate, endDate); 
	}

}
